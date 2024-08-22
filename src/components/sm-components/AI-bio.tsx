import { useRef, useState } from 'react';
import { Input } from '../ui/input';
import axios from 'axios';
import { WandSparkles } from 'lucide-react';
import Typewriter from 'typewriter-effect'
import { Copy } from 'lucide-react';

export default function AIBio() {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const[copyText,setCopyText]  =useState('')

    const generate = async (input: string) => {
        try {
            const result = await axios.post('/api/ai-bio', { input });
            const msg = result.data.content || 'No response from AI';
            setResponse(msg);
        } catch (error) {
            console.error("Error generating bio:", error);
            setResponse('An error occurred while generating the bio.');
        }
    };

    function copy(){
        if(response){
            navigator.clipboard.writeText(response).then(()=>{
                setCopyText('copied')
            })
        }
    }

    function openModal() {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    }

    return (
        <div>
            {/* Open the modal using the showModal method */}
            <button onClick={openModal}>Generate with AI</button>
            <dialog id="my_modal_1" className="modal" ref={modalRef}>
                <div className="modal-box flex flex-col">
                    <h3 className="font-bold pb-1">AI bio generator</h3>
                    <Input 
                        onChange={(e) => setInput(e.target.value)} 
                        value={input} 
                        placeholder="Tell me about yourself" 
                        className="my-3" 
                    />
                    <button 
                        onClick={() => generate(input)} 
                        className="text-sm  btn"
                    >
                        Generate 
                        <WandSparkles size={16} />
                    </button>

                    <div className='py-2' >
                        <Typewriter 
                        options={{
                            strings:[response],
                            autoStart:true,
                            delay:30,
                            loop:false,
                            deleteSpeed:Infinity,
                            cursor:''
                        }}/>
                    </div>

                    {response&&(
                        <button
                        
                         className='flex items-center  w-20 '
                         onClick={copy} 
                         >
                            <Copy size={34} textAnchor='copy' className="px-2" />
                            {copyText}
                        </button>
                    )}

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-1 top-2">✕</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
