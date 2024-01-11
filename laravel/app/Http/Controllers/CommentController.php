<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::paginate(2);
        return response()->json($comments);
    }

    public function show($id)
    {
        $comment = Comment::find($id);
        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }
        return response()->json($comment);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required',
            'user_id' => 'required|exists:users,id',
            'article_id' => 'required|exists:articles,id',
            'status' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $comment = Comment::create($validator->validated());
        return response()->json($comment, 201);
    }

    public function update(Request $request, $id)
    {
        $comment = Comment::find($id);
        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'content' => 'sometimes|required',
            'user_id' => 'sometimes|required|exists:users,id',
            'article_id' => 'sometimes|required|exists:articles,id',
            'status' => 'sometimes|required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $comment->update($validator->validated());
        return response()->json($comment);
    }

    public function destroy($id)
    {
        $comment = Comment::find($id);
        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        $comment->delete();
        return response()->json(['message' => 'Comment deleted']);
    }
}
