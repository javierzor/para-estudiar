<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Google\Client as GoogleClient; // Importar Google Client
use Google\Service\Drive as GoogleDrive; // Importar Google Drive

class DriveController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file',
        ]);

        // Inicializa Google Client
        $client = new GoogleClient();
        $client->setAuthConfig(storage_path('credentials234234324554.json'));
        $client->addScope(GoogleDrive::DRIVE_FILE);

        // Crea el servicio de Google Drive
        $service = new GoogleDrive($client);

        // Obtiene el archivo desde la solicitud
        $file = $request->file('file');

        $folderId = '17lOPcxyADh-P3xAcgwwaUbR8L8Rq0sjP'; // ID de la carpeta donde deseas guardar el archivo

        $nombreArchivo = substr(str_shuffle('abcdefghijklmnopqrstuvwxyz0123456789'), 0, 15);

        $fileMetadata = new \Google\Service\Drive\DriveFile(array(
            'name' => $nombreArchivo,
            'parents' => array($folderId) // Asigna la carpeta
        ));



        // Carga el archivo
        $content = file_get_contents($file->getRealPath());
        $uploadedFile = $service->files->create($fileMetadata, [
            'data' => $content,
            'mimeType' => $file->getMimeType(),
            'uploadType' => 'multipart',
            'fields' => 'id',
        ]);

        return response()->json(['fileId' => $uploadedFile->id]);
    }
}
