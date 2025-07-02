import { useRef, useState, useCallback, useEffect } from "react";

export const useDraggable = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setPosition({ x: rect.left, y: rect.top });
        }
    }, []);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
        setDragging(true);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (dragging) {
            setPosition({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
            });
        }
    }, [dragging, offset]);

    const handleMouseUp = useCallback(() => {
        setDragging(false);
    }, []);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const touch = e.touches[0];
            setOffset({
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top,
            });
        }
        setDragging(true);
    }, []);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (dragging) {
            e.preventDefault();
            const touch = e.touches[0];
            setPosition({
                x: touch.clientX - offset.x,
                y: touch.clientY - offset.y,
            });
        }
    }, [dragging, offset]);

    const handleTouchEnd = useCallback(() => {
        setDragging(false);
    }, []);

    useEffect(() => {
        if (dragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleTouchMove, { passive: false });
            window.addEventListener('touchend', handleTouchEnd);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [dragging, handleMouseMove, handleTouchMove, handleMouseUp, handleTouchEnd]);

    return {
        ref,
        position,
        dragging,
        handleMouseDown,
        handleTouchStart,
    };
}