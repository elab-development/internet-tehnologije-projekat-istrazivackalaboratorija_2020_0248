<?php
 
namespace App\Http\Controllers;

use App\Models\Article;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ArticleController extends Controller
{
    public function index() //vraca sve moguce artikle,, npr za admin page
    {
        $articles = Article::all();   
        return response()->json($articles);
    }
    public function mojiArtikli() //vraca artikle ulogovanog usera, npr za stranicu za CRUD operacije
    {
        $user = Auth::user();
        $articles = Article::where('user_id', $user->id)->get();   
        return response()->json($articles);
    } 
    public function show($id)
    {
        $article = Article::find($id);
        if (!$article) {
            return response()->json(['message' => 'Article not found'], 404);
        }
        
        // Pretpostavimo da je 'image_path' atribut na modelu Article koji sadrži putanju do fajla
        $file = $article->image_path;
        $path = storage_path('app/' . $file);
    
        // Proveravamo da li fajl postoji na disku
        if (!Storage::exists($file)) {
            return response()->json(['message' => 'File not found'], 404);
        }
    
        // Povratiti originalno ime fajla iz putanje
        $originalName = basename($file);
    
        // Vraćamo fajl
        return response()->download($path, $originalName);
    }
    

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'content' => 'required', 
            'abstract' => 'nullable|string', 
            'keywords' => 'nullable|string', 
            'file' => 'required|file', 
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        $user = Auth::user(); // Dohvati trenutno prijavljenog korisnika
        $data = $validator->validated();
    
        // Postavi published_at na trenutni datum i vreme
        $data['published_at'] = Carbon::now();
        // Ako je fajl uploadovan, sačuvaj ga u storage i generiši putanju
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $path = $file->store('uploads'); // Čuvamo fajl u storage/uploads
            $data['image_path'] = $path;
        }
    
        $data['user_id'] = $user->id; // Postavi user_id na ID trenutno prijavljenog korisnika
    
        $article = Article::create($data);
        return response()->json($article, 201);
    }

    public function update(Request $request, $id)
    {
        $article = Article::find($id);
        if (!$article) {
            return response()->json(['message' => 'Article not found'], 404);
        }
    
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|max:255',
            'content' => 'sometimes|required',
            'abstract' => 'nullable|string', 
            'keywords' => 'nullable|string', 
            'published_at' => 'nullable|date',
            'image_path' => 'nullable|string'
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        $article->update($validator->validated());
        return response()->json($article);
    }
    

    public function destroy($id)
    {
        $article = Article::find($id);
        if (!$article) {
            return response()->json(['message' => 'Article not found'], 404);
        }

        $article->delete();
        return response()->json(['message' => 'Article deleted']);
    }


    public function fetchScienceEvents(Request $request)  //potrebno je kroz request poslati parametar page za paginaciju  http://127.0.0.1:8000/api/fetchScienceEvents?page=2
    {
        $apiKey = 'rQaLInSZHng8AiA3h8qSt41RdHFKBmd3';
        $page = $request->input('page', 0);  
        $response = Http::get("https://app.ticketmaster.com/discovery/v2/events.json", [
            'apikey' => $apiKey,
            'keyword' => 'science',
            'size' => 10,
            'page' => $page
        ]);
    
        if ($response->successful()) {
            $events = $response->json();
            return response()->json($events);
        } else {
            return response()->json(['message' => 'Nije moguće dobiti podatke'], $response->status());
        }
    }
    
    public function search(Request $request)
    {
        $query = Article::query();
    
        if ($request->has('title')) {
            $query->where('title', 'like', '%' . $request->input('title') . '%');
        }
        if ($request->has('content')) {
            $query->where('content', 'like', '%' . $request->input('content') . '%');
        }
        if ($request->has('user_id')) {
            $query->where('user_id', $request->input('user_id'));
        }
        if ($request->has('published_from') && $request->has('published_to')) {
            $query->whereBetween('published_at', [$request->input('published_from'), $request->input('published_to')]);
        }
    
        $articles = $query->get();
        return response()->json($articles);
    }
    
  




    
}
