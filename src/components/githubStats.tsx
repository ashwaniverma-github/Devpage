import { motion } from 'framer-motion';

export default function GitHubStats({ githubUrl }: any) {
    const username = githubUrl?.split('/').filter(Boolean).pop();
    const contributionUrl = `https://ghchart.rshah.org/${username}`;

    const isValidUsername = username && /^[a-zA-Z0-9-]+$/.test(username);

    if (!isValidUsername) {
        return null;
    }

    return (
        <motion.div 
            className="flex justify-center items-center rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-center mt-6 relative max-w-full">
                <motion.div 
                    className="relative w-full max-w-xs md:max-w-sm lg:max-w-md"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                >
                    <img 
                        src={contributionUrl} 
                        alt={`${username}'s GitHub Contributions`} 
                        className="w-full h-auto border p-1 rounded-md"
                    />
                </motion.div>
                <p className="text-center text-sm pt-1 font-semibold font-mono">GitHub Contributions</p>
            </div>
        </motion.div>
    );
}
