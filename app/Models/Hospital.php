<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Hospital extends Authenticatable implements JWTSubject
{
    use Notifiable;

    public $timestamps = false;

    protected $table = 'tb_rs';
    
    protected $primaryKey = 'id_rs';

    protected $fillable = [
        'lat_lng_rs',
        'nama_rs',
        'alamat_rs',
        'id_type_rs',
        'image_url',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}

