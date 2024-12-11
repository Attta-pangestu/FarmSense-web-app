/** @format */

import React, { useState } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { geminiModel } from "../config/gemini.js";

const Home = () => {
	const [chatMessage, setChatMessage] = useState("");
	const [chatHistory, setChatHistory] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
		  e.preventDefault();
		  handleChatSubmit();
		}
	  };

	  const handleChatSubmit = async () => {
		if (chatMessage.trim() === "") return;
	  
		setIsLoading(true);
		
		// Add user message immediately
		setChatHistory(prev => [...prev, { type: "user", message: chatMessage }]);
		
		try {
		  // Send to Gemini API
		  const prompt = `As a farming expert assistant, please help with this query: ${chatMessage}
			Focus on providing practical farming advice and solutions.
			Format the response in a clean, structured way using:
			- Clear headings with "**" for bold
			- Bullet points with "*" for lists
			- Organized sections
			- Concise explanations
			Keep the response specific to farming topics.`;
	  
		  const result = await geminiModel.generateContent(prompt);
		  const response = await result.response;
		  let botMessage = response.text();
		  
		  // Format the response
		  botMessage = botMessage
			// Format headings
			.replace(/^(.*?):/gm, '**$1:**')
			// Format bullet points
			.replace(/^[-•]\s*(.*)/gm, '* $1')
			// Add spacing between sections
			.replace(/\n\n/g, '\n\n')
			// Clean up any extra whitespace
			.trim();
	
		  // Add bot response
		  setChatHistory(prev => [...prev, { 
			type: "bot", 
			message: botMessage,
			isFormatted: true // Add this flag for formatted messages
		  }]);
		} catch (error) {
		  console.error('Error:', error);
		  setChatHistory(prev => [...prev, {
			type: "bot",
			message: "Sorry, I encountered an error. Please try again."
		  }]);
		} finally {
		  setChatMessage("");
		  setIsLoading(false);
		}
	};

	return (
		<>
			<Nav />

			{/* Main content */}
			<div className='bg-gray-50 min-h-screen flex flex-col lg:flex-row'>
				{/* Left Sidebar with 4 Blocks */}
				<div className='w-full lg:w-3/4 p-4 lg:p-8'>
					<div className='max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8'>
						<h1 className='text-5xl font-extrabold text-green-800 mb-8'>
							Welcome to Your Farm Dashboard
						</h1>

						{/* Quick Links */}
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-8'>
							{[
								{
									to: "/home",
									title: "Home",
									description: "Overview of your farm activities.",
								},
								{
									to: "/leafletmap",
									title: "Gis Crop Analysis",
									description: "Analyze crop health and land usage.",
								},
								{
									to: "/farm",
									title: "Your Farm",
									description: "Manage and monitor your farm operations.",
								},
								{
									to: "/weather",
									title: "Weather",
									description:
										"Check the current and forecasted weather conditions.",
								},
							].map((link) => (
								<Link
									key={link.to}
									to={link.to}
									className='bg-gradient-to-r from-green-600 to-green-400 text-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center hover:from-green-700 hover:to-green-500 transition duration-300 ease-in-out'>
									<div className='text-center'>
										<h2 className='text-xl font-semibold'>{link.title}</h2>
										<p className='mt-2'>{link.description}</p>
									</div>
								</Link>
							))}
						</div>

						{/* Key Statistics */}
						<div className='bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-lg p-6 mb-8'>
							<h2 className='text-4xl font-bold text-green-800 mb-6'>
								Farm Statistics
							</h2>
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
								{[
									{ title: "Total Crops", value: "120" },
									{ title: "Irrigation Level", value: "75%" },
									{ title: "Pest Alerts", value: "3" },
								].map((stat) => (
									<div
										key={stat.title}
										className='bg-white rounded-lg p-6 shadow-md border-l-4 border-green-500 flex flex-col items-center'>
										<h3 className='text-lg font-semibold text-green-800'>
											{stat.title}
										</h3>
										<p className='text-4xl font-bold mt-2'>{stat.value}</p>
									</div>
								))}
							</div>
						</div>

						{/* Alerts */}
						<div className='bg-red-50 rounded-lg shadow-lg p-6 mb-8'>
							<h2 className='text-4xl font-bold text-red-600 mb-6'>Alerts</h2>
							<ul className='list-disc pl-6 space-y-2'>
								<li className='text-sm text-gray-800'>
									High risk of pest in corn fields.
								</li>
								<li className='text-sm text-gray-800'>
									Irrigation level is low; consider scheduling watering.
								</li>
								<li className='text-sm text-gray-800'>
									Prepare soil for next planting season.
								</li>
							</ul>
						</div>

						{/* Tips and Recommendations */}
						<div className='bg-green-50 rounded-lg shadow-lg p-6'>
							<h2 className='text-4xl font-bold text-green-800 mb-6'>
								Tips & Recommendations
							</h2>
							<ul className='list-disc pl-6 space-y-2'>
								<li className='text-sm text-gray-800'>
									Monitor weather forecasts to plan your irrigation.
								</li>
								<li className='text-sm text-gray-800'>
									Regularly check for pest infestations to prevent crop damage.
								</li>
								<li className='text-sm text-gray-800'>
									Consider using crop rotation to maintain soil health.
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Recommendation Bot */}
				<div className='w-full lg:w-1/3 bg-white p-4 border-l border-gray-200 lg:relative lg:min-h-screen'>
					<div className='lg:fixed lg:top-24 lg:right-5 lg:w-96 lg:p-6 lg:shadow-lg lg:rounded-lg lg:border-l lg:border-gray-200'>
						<h2 className='text-3xl font-bold text-green-800 mb-4'>
							AI ASSISTANT CHAT
						</h2>
						
						<div className='bg-gray-100 p-4 rounded-lg h-64 overflow-y-scroll'>
						{chatHistory.map((chat, index) => (
    <div
        key={index}
        className={`flex mb-4 ${
            chat.type === "user" ? "justify-end" : "justify-start"
        }`}>
        <div
            className={`${
                chat.type === "user"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-800"
            } rounded-lg p-4 max-w-xs shadow-md`}>
            {chat.isFormatted ? (
                <div className="formatted-response">
                    {chat.message.split('\n').map((line, i) => {
                        if (line.startsWith('**')) {
                            // Heading
                            return <h3 key={i} className="font-bold text-lg mt-2 mb-1">
                                {line.replace(/\*\*/g, '')}
                            </h3>;
                        } else if (line.startsWith('*')) {
                            // Bullet point
                            return <li key={i} className="ml-4">
                                {line.substring(2)}
                            </li>;
                        } else {
                            // Regular text
                            return <p key={i} className="mb-1">{line}</p>;
                        }
                    })}
                </div>
            ) : (
                <p>{chat.message}</p>
            )}
        </div>
    </div>
))}
							{isLoading && (
								<div className='flex justify-start mb-4'>
									<div className='bg-gray-200 text-gray-800 rounded-lg p-4 max-w-xs'>
										{/* Add a spinner or loading message */}
										<div className='flex items-center'>
											<svg
												className='animate-spin h-6 w-6 text-gray-500 mr-2'
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'>
												<circle
													className='opacity-25'
													cx='12'
													cy='12'
													r='10'
													stroke='currentColor'
													strokeWidth='4'></circle>
												<path
													className='opacity-75'
													fill='currentColor'
													d='M4 12a8 8 0 0 1 16 0 8 8 0 0 1-16 0z'></path>
											</svg>
											<span>Generating response...</span>
										</div>
									</div>
								</div>
							)}
						</div>
						<textarea
							className='w-full h-24 p-4 border border-gray-300 rounded-lg resize-none mt-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500'
							placeholder='Type your question here...'
							value={chatMessage}
							onChange={(e) => setChatMessage(e.target.value)}
						/>
						<button
							className='mt-4 w-full bg-green-700 text-white rounded-lg p-2 hover:bg-green-600 transition duration-300'
							onClick={handleChatSubmit}>
							Submit
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
