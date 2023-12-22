import React, { useState } from "react";

const MyComponent = () => {
    let isRunning = true;

    const startLoop = () => {

        // Indefinite loop
        const loop = () => {
            if (!isRunning) {
                return; // Break the loop if stop button is clicked
            }
            console.log("?");
            return new Promise((resolve: any) => {
                // Simulating an asynchronous operation with a timeout
                setTimeout(() => {
                    // console.log(i);
                    // i++;
                    requestAnimationFrame(loop); // Continue the loop
                    resolve();
                }, 1000); // Replace with the actual asynchronous operation
            });
            // Your loop logic goes here

            // requestAnimationFrame(loop); // Continue the loop
        };

        loop(); // Start the loop
    };

    const stopLoop = () => {
        isRunning = false;
    };

    return (
        <div>
            <button onClick={startLoop}>Start</button>
            <button onClick={stopLoop}>Stop</button>
        </div>
    );
};

export default MyComponent;