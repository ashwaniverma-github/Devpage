import { useRef, useState } from 'react';
import { Input } from '../ui/input';
import axios from 'axios';
import { Loader, Loader2Icon, SplineIcon, WandSparkles } from 'lucide-react';
import Typewriter from 'typewriter-effect'
import { Copy, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

export default function AIBio() {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [copyText, setCopyText] = useState('')
    const [loading, setLoading] = useState(false)

    const generate = async (input: string) => {
        try {
            setLoading(true)
            const result = await axios.post('/api/ai-bio', { input });
            const msg = result.data.content || 'No response from AI';
            setResponse(msg);
            setLoading(false)
        } catch (error) {
            console.error("Error generating bio:", error);
            setResponse('An error occurred while generating the bio.');
        }
    };

    function copy() {
        if (response) {
            navigator.clipboard.writeText(response).then(() => {
                setCopyText('Copied!')
                setTimeout(() => setCopyText(''), 2000);
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
            <Button
                onClick={openModal}
                
                className="border-gray-600  bg-gray-800 text-white hover:bg-gray-700 hover:border-gray-500 transition-all"
            >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate with AI
            </Button>

            <dialog id="my_modal_1" className="modal" ref={modalRef}>
                <div className="modal-box flex flex-col bg-gray-900 border border-gray-700">
                    <h3 className="font-bold text-xl text-white pb-4 flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-gray-300" />
                        AI Bio Generator
                    </h3>
                    <div className="space-y-4">
                        <textarea
                            className="textarea textarea-bordered w-full bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500"
                            placeholder="Describe yourself, your skills, experience, or what you want to highlight..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button
                            onClick={() => generate(input)}
                            className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                            disabled={loading || !input.trim()}
                        >
                            {loading ? (
                                <>
                                    <div className="loading loading-spinner loading-sm"></div>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Generate Bio
                                </>
                            )}
                        </Button>
                    </div>

                    {response && (
                        <div className='py-4 border-t border-gray-700'>
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-white">Generated Bio:</h4>
                                <Button
                                    onClick={copy}
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-300 hover:text-white hover:bg-gray-800"
                                >
                                    <Copy size={16} className="mr-2" />
                                    {copyText || 'Copy'}
                                </Button>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                <div className="text-white min-h-[100px] leading-relaxed">
                                    <div className="text-white [&_*]:text-white font-medium">
                                        <Typewriter
                                            options={{
                                                strings: [response],
                                                autoStart: true,
                                                delay: 30,
                                                loop: false,
                                                deleteSpeed: Infinity,
                                                cursor: '',
                                                cursorClassName: 'text-white'
                                            }}
                                            onInit={(typewriter) => {
                                                typewriter.changeDelay(30);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            <Button variant="outline" className="border-gray-600  bg-gray-800 text-white">
                                Close
                            </Button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
