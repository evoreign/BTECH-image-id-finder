"use client"
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Header from "@/components/navbar-header";
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { Separator } from "@/components/ui/separator"
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
    <main className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 md:px-16 lg:px-32">
      <Header/>
      <div className="w-full max-w-3xl">
        <TextGenerateEffect words='Doc upload' className="text-center" />
        <Separator className="my-4" />
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight flex flex-col sm:flex-row w-full items-center space-y-2 sm:space-y-0 sm:space-x-2 justify-center pb-5">Upload your master sheet folder here.</h4>
        <div className="flex flex-col sm:flex-row w-full items-center space-y-2 sm:space-y-0 sm:space-x-2 justify-center">
        
          <div {...getRootProps()} className={`border-dashed border-2 ${isDragActive ? 'border-green-600 bg-green-100' : 'border-gray-600'} p-10 w-full max-w-xl gap-1.5 rounded-2xl h-96 flex flex-col justify-center items-center sm:w-auto flex-grow`}>
            
            <input {...getInputProps()} />
            <p className="text-sm text-muted-foreground">Drag and drop some files here, or click here to select files</p>
            <ul>{filesList}</ul>
          </div>
        </div>
        
      </div>
      
    </main>
  );
}