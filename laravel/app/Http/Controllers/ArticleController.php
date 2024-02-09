<?php
 
namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
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
            'reference' => 'nullable|array',
            'reference.*.title' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        $user = Auth::user();
        $data = $validator->validated();
    
        $data['published_at'] = Carbon::now();
    
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $path = $file->store('uploads');
            $data['image_path'] = $path;
        }
    
        $data['user_id'] = $user->id;
    
        $articleData = Arr::except($data, ['reference']);
        if (isset($data['reference'])) {
            $articleData['reference'] = json_encode($data['reference']); // Convert references to JSON string.
    
            // Proveri svaku referencu i povećaj brojač citiranja ako je potrebno
            foreach ($data['reference'] as $reference) {
                $referencedArticle = Article::where('title', $reference['title'])->first();
                if ($referencedArticle) {
                    $referencedArticle->increment('citations_count');
                }
            }
        }
    
        $article = Article::create($articleData);
    
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
    
  
    public function statistics()
    {
        $totalResearchers = User::where('role_id', '=', 2)->count();
        $totalArticles = Article::count();
    
        $authorsWithArticleCount = User::where('role_id', '=', 2)
            ->withCount('articles')
            ->get(['id', 'name', 'articles_count']);
    
        $articlesWithCitationsCount = Article::with('user')
            ->select('id', 'title')
            ->withCount('comments')
            ->get(['id', 'title', 'comments_count']);
    
        return response()->json([
            'totalResearchers' => $totalResearchers,
            'totalArticles' => $totalArticles,
            'authorsWithArticleCount' => $authorsWithArticleCount,
            'articlesWithCitationsCount' => $articlesWithCitationsCount
        ]);
    }
    


    public function odobri($id)
    {
        $article = Article::find($id);
        if (!$article) {
            return response()->json(['message' => 'Article not found'], 404);
        }
    
        $article->odobreno = true;
        $article->save();
    
        return response()->json(['message' => 'Article approved successfully', 'article' => $article]);
    }
    
    
}
