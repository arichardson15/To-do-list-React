<?php
namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;

class Test extends Controller{

   public function ajaxTest()
   {
      return response()->json([
         'success'=>'Got Simple Ajax Request.',
         'request' => request()->all()
      ]);
   }

   public function addTodo(Request $request)
   {
       return Todo::create([
           'name' => $request->input('name')
       ]);

   }

   public function getAllToDos(){
       return Todo::all();
   }

    public function toggleToDo(Request $request){
        $todo = Todo::findOrFail( $request->input('id'))->first();
        if ($todo->completed == 1) {
            $todo->completed = 0;
            $todo->save();
            return Todo::all();
        }
        $todo->completed = 1;
        $todo->save();

        return Todo::all();

   }

   public function deleteToDo(Request $request){
       $todo = Todo::findOrFail($request->input('id'));
       if(!$todo){
           return 'Todo not found';
       }
       $todo->delete();
       return Todo::all();
   }

   public function updateToDo(Request $request){
       $todo = Todo::findOrFail($request->input('id'));
       $newName = $request->input('newName');
       if(!$todo){
           return 'Todo not found';
       }
       $todo->update(['name' => $newName]);
       return Todo::all();
   }



}
