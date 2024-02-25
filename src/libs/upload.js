import toast from "react-hot-toast";

export default async function upload(e, callbackFn) {
    const file = e.target.files?.[0];
    
    if(file) {

        const promise = new Promise(async (resolve, reject) => {
            const data = new FormData;
            data.set('file', file);

            await fetch('/api/upload', {
                method: 'POST',
                body: data,
                }).then(response => {
                    if(!response.ok) {
                        reject("Error uploading file");
                    }
                    response.json().then(link => {
                    callbackFn(link);
                    resolve(link);
                });
            }); 

        });

        await toast.promise(promise, {
            loading: 'Uploading...',
            success: 'File uploaded!',
            error: 'Error uploading file'
        });
        
    }
}