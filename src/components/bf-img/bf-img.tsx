import { FunctionalComponent } from '@stencil/core';

export const BfImg: FunctionalComponent<{ src: string }> = (props: any): any => {

    let io: IntersectionObserver;
    let img: HTMLElement;

    function handleImage(): void {
        // const image: HTMLImageElement = this.el.shadowRoot.querySelector('img');
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = (): void => {
            img.removeAttribute('data-src');
        };
    }

    function addIntersectionObserver(): void {
        // if (!src) {
        //     return;
        // }
        if ('IntersectionObserver' in window) {
            io = new IntersectionObserver((data: any): void => {
                // because there will only ever be one instance
                // of the element we are observing
                // we can just use data[0]
                if (data[0].isIntersecting) {
                    handleImage();
                    removeIntersectionObserver();
                }
            });

            // tslint:disable-next-line
            img && io.observe(img);
        } else {
            // fall back to setTimeout for Safari and IE
            setTimeout(() => {
                handleImage();
            }, 300);
        }
    }

    function removeIntersectionObserver(): void {
        if (io) {
            io.disconnect();
            io = null;
        }
    }

    function imgAdded(el: any): HTMLElement {
        img = el as HTMLElement;

        setTimeout(() => {
            addIntersectionObserver();
        }, 100);

        return img;
    }

    const i: JSX.Element = <img ref={imgAdded} data-src={props.src} />;
    return (!!props.src) ? i : null;

};

