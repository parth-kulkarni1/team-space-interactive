


export async function previewFile(file : File, type: string){
    
    const reader = new FileReader();
    reader.readAsDataURL(file);

    const result = new Promise((resolve) => reader.onloadend = () => {
        resolve(reader.result as string)
    })


    const val = await result as string


    return {base64 : val, type: type}
  

}
