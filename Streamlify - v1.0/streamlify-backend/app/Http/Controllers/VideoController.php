<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Iman\Streamer\VideoStreamer;

class VideoController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'url' => 'required|file|mimetypes:video/mp4',
            'preview' => 'required|file|mimetypes:video/mp4',
            'poster' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $name = sha1(Str::random(15) . now());
        $urlPath = "$name." . $request->url->extension();
        $previewPath = "$name." . $request->preview->extension();
        $posterPath = "$name." . $request->poster->extension();
        $request->url->move(public_path('urls'), $urlPath);
        $request->preview->move(public_path('previews'), $previewPath);
        $request->poster->move(public_path('posters'), $posterPath);

        return response()->json([
            'url' => route('get_video', ['folder' => 'urls', 'videoName' => $urlPath]),
            'preview' => route('get_video', ['folder' => 'previews', 'videoName' => $previewPath]),
            'poster' => url("/posters/$posterPath")
        ], 201);
    }

    public function show($folder, $videoName)
    {
        $path = public_path("$folder/$videoName");
        VideoStreamer::streamFile($path);
    }
}
