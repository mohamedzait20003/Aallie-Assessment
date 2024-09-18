<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
    public function showall()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    public function store(StoreTaskRequest $request)
    {
        $task = Task::create([
            'name' => $request->input('name'),
            'completed' => false,
        ]);
        return response()->json($task, 201);
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());
        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(null, 204);
    }
}
