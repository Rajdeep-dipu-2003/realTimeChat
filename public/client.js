    
        const socket = io();
        const sendBtn = document.getElementById("sendBtn");
        const messageInput = document.getElementById("message");
        const chatBox = document.getElementById("chatBox");
        
        const name = prompt("Enter Your Name To Join");
        socket.emit('new-user-joined' , name);

        sendBtn.addEventListener("click", (e) => {
            const message = messageInput.value;
            chatBox.innerHTML = chatBox.innerHTML + `<div class="left">
                                                            <h6>Me</h6>            
                                                            <p>
                                                                ${message}
                                                            </p>
                                                        </div>`;

            socket.emit('send', message);
            messageInput.value = "";
            chatBox.scrollTop = chatBox.scrollHeight;
        });

        messageInput.addEventListener("keypress" , (e) =>{
            if(e.key === "Enter" || e.keyCode === 13) {
                const message = messageInput.value;
                
                chatBox.innerHTML = chatBox.innerHTML + `<div class="left">
                                                            <h6>Me</h6>            
                                                            <p>
                                                                ${message}
                                                            </p>
                                                        </div>`;

                socket.emit('send', message);
                messageInput.value = "";
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        });

        socket.on('receive' , dataObj => {
            chatBox.innerHTML = chatBox.innerHTML + `<div class="right">
                                                        <h6>${dataObj.name}</h6>
                                                        <p>
                                                            ${dataObj.message} 
                                                        </p>
                                                    </div>`;
            chatBox.scrollTop = chatBox.scrollHeight;
        })
