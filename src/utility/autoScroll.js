export default function autoScroll(isSmooth = false) {
    const chatArea = document.querySelector('.chat-body');
    chatArea.scrollTo({
        top: chatArea.scrollHeight, // scrollHeight ensures you scroll to the bottom of the chat
        behavior: isSmooth ? 'smooth' : 'auto'
    });
}