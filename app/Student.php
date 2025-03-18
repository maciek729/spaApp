<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $guarded=[];

    protected $casts=['paid'=>'boolean', 'age'=>'integer'];

    protected $fillable = [
        'first_name', 'last_name', 'description', 'paid', 'age', 'index', 'email'];
}
