function OpenModal(modalSelector, timerModal) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = "hidden";
    console.log(timerModal);
    if (timerModal) {
        clearTimeout(timerModal);
    }

}

function CloseModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = "";

}

function modal(triggerSelector, modalSelector, timerModal) {
    const btnOpen = document.querySelectorAll(triggerSelector),

        modal = document.querySelector(modalSelector);

    btnOpen.forEach(item => {
        item.addEventListener('click', () => OpenModal(modalSelector, timerModal));
    });



    document.addEventListener('keydown', (e) => {
        if (e.code == "Escape") {
            CloseModal(modalSelector);
        }

    });
    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target.getAttribute('data-close') == '') {
            CloseModal(modalSelector);
        }
    });


    function endModal() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            OpenModal(modalSelector, timerModal);
            window.removeEventListener('scroll', endModal);
        }
    }
    window.addEventListener('scroll', endModal);

}
export default modal;
export { OpenModal, CloseModal };