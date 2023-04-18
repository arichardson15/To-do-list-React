<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Test extends Controller{

   public function ajaxTest()
   {
      return response()->json([
         'success'=>'Got Simple Ajax Request.',
         'request' => request()->all()
      ]);
   }
}