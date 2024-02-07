<?php
 
namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::paginate(3);   //https:127.0.0.8000/api/articles?page=3
        return response()->json($articles);
    }

    public function show($id)
    {
        $article = Article::find($id);
        if (!$article) {
            return response()->json(['message' => 'Article not found'], 404);
        }
        return response()->json($article);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'content' => 'required',
            'user_id' => 'required|exists:users,id',
            'published_at' => 'nullable|date',
            'image_path' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $article = Article::create($validator->validated());
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
            'user_id' => 'sometimes|required|exists:users,id',
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
