"use client"
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Header from "@/components/navbar-header";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Doc() {
  const [files, setFiles] = useState<File[]>([]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    // onDrop is the function that will be called when files are dropped onto the dropzone
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const filesList = files.map(file => (
    <li key={file.name}>
      {file.name} - {file.type}
    </li>
  ));

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Header/>
      <div {...getRootProps()} className={`border-dashed border-2 ${isDragActive ? 'border-green-600 bg-green-100' : 'border-gray-600'} p-10 w-full max-w-xl items-center gap-1.5 rounded-2xl h-96 flex flex-col justify-center items-center`}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <ul>{filesList}</ul>
      </div>
    </main>
  );
}