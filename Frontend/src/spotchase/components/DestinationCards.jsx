import Image from 'next/image';
import React from 'react';

const DestinationCards = ({ imageUrl, destination, tripDescription, mostLiked, leastLiked, budget, splurgeStatus }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md">
            <div className="relative h-48">
                <Image 
                    className="object-cover w-full h-full"
                    src={imageUrl} 
                    alt={`Trip to ${destination}`} 
                    layout="fill"
                />
            </div>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">Trip to {destination}</h2>
                <p className="text-gray-600 mb-4">{tripDescription}</p>
                <div className="space-y-1">
                    <p><span className="font-semibold">Most Liked:</span> {mostLiked}</p>
                    <p><span className="font-semibold">Least Liked:</span> {leastLiked}</p>
                    <p><span className="font-semibold">Budget:</span> ${budget} (Willing to splurge: {splurgeStatus})</p>
                </div>
            </div>
        </div>
    );
};

export default DestinationCards;