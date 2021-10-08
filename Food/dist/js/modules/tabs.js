function tabs(parentTabsSel, tabsSel, tabcontentSel, activeClass) {
    let parentTabs = document.querySelector(parentTabsSel),
        tabs = document.querySelectorAll(tabsSel),
        tabcontent = document.querySelectorAll(tabcontentSel);

    function HideMod() {
        tabcontent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');

        });
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });

    }


    function ShowMod(i = 0) {
        tabcontent[i].classList.add('show', 'fade');
        tabcontent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }
    HideMod();
    ShowMod();
    parentTabs.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains(tabsSel.slice(1))) {
            tabs.forEach((item, i) => {
                if (item === e.target) {
                    HideMod();
                    ShowMod(i);

                }
            });
        }
    });
}
export default tabs;