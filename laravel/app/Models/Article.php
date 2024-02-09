<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'title', 'content', 'user_id', 'published_at', 'image_path','abstract','keywords','citations_count','reference','odobreno' //dodato polje reference kako bismo napravli automatsko citiranje
    ];//polje odobreno nam govori da li je odobrena publikacija od strane admina ili ne

    protected $dates = ['published_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}
