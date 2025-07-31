import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';


const CustomCursor = () => {
    const cursorRef = useRef(null);
    const cursorBigRef = useRef(null);

    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
    if (isMobile) {
        return null
    }

    useEffect(() => {
        const cursor = cursorRef.current
        const cursorBig = cursorBigRef.current

        gsap.set([cursor, cursorBig], {
            xPercent: -50,
            yPercent: -50,
        })

        const xTo = gsap.quickTo(cursor, "x", {
            duration: 0.2, ease: "power3.out"
        })
        const yTo = gsap.quickTo(cursor, "y", {
            duration: 0.2, ease: "power3.out"
        })
        const xToBig = gsap.quickTo(cursorBig, "x", {
            duration: 0.5, ease: "power.out"
        })
        const yToBig = gsap.quickTo(cursorBig, "y", {
            duration: 0.5, ease: "power3.out"
        })

        const handleMouseMove = (e) => {
            xTo(e.clientX)
            yTo(e.clientY)
            xToBig(e.clientX)
            yToBig(e.clientY)
        }
        window.addEventListener("mousemove",handleMouseMove)

        document.addEventListener("mousedown", () =>{
            gsap.to([cursor,cursorBig],{
                scale: 0.6,
                duration: 0.2,
            })
        })

        document.addEventListener("mouseup", () =>{
            gsap.to([cursor,cursorBig],{
                scale: 1,
                duration: 0.2,
            })
        })
    }, [])


    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-[20px] h-[20px] bg-sky-600 rounded-full pointer-events-none z-[999] mix-blend-difference"
            />
            <div
                ref={cursorBigRef}
                className="fixed top-0 left-0 w-[35px] h-[35px] border-1 border-sky-600 rounded-full pointer-events-none z-[999] mix-blend-difference opacity-50"
            />
        </>
    )
}

export default CustomCursor
