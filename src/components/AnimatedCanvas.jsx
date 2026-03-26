import React, { useEffect, useRef } from 'react';

const AnimatedCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animFrame;
        let offset = 0;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);

            const step = 20;
            const bigStep = 100;
            offset = (offset + 0.3) % bigStep;

            ctx.strokeStyle = 'rgba(22,22,22,1)';
            ctx.lineWidth = 0.5;
            for (let x = (offset % step); x < w + step; x += step) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
            }
            for (let y = (offset % step); y < h + step; y += step) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
            }

            ctx.strokeStyle = 'rgba(30,30,30,1)';
            ctx.lineWidth = 1;
            for (let x = (offset % bigStep); x < w + bigStep; x += bigStep) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
            }
            for (let y = (offset % bigStep); y < h + bigStep; y += bigStep) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
            }

            const cx = w / 2;
            const cy = h / 2;
            const t = Date.now() / 1000;
            [80, 180, 300, 440].forEach((baseR, i) => {
                const r = baseR + Math.sin(t * 0.6 + i) * 30;
                const alpha = 0.06 + Math.sin(t * 0.4 + i * 1.2) * 0.04;
                ctx.strokeStyle = `rgba(192,57,43,${alpha})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.stroke();
            });

            const dots = [
                { bx: 0.15, by: 0.12, speed: 0.7, phase: 0 },
                { bx: 0.38, by: 0.08, speed: 0.5, phase: 1.5 },
                { bx: 0.65, by: 0.11, speed: 0.8, phase: 3 },
                { bx: 0.82, by: 0.18, speed: 0.6, phase: 0.8 },
                { bx: 0.92, by: 0.35, speed: 0.9, phase: 2.2 },
                { bx: 0.08, by: 0.55, speed: 0.5, phase: 4 },
                { bx: 0.95, by: 0.65, speed: 0.7, phase: 1 },
                { bx: 0.28, by: 0.88, speed: 0.6, phase: 3.5 },
            ];
            dots.forEach(d => {
                const dx = Math.sin(t * d.speed + d.phase) * 8;
                const dy = Math.cos(t * d.speed * 0.7 + d.phase) * 10;
                const x = d.bx * w + dx;
                const y = d.by * h + dy;
                const alpha = 0.4 + Math.sin(t * d.speed + d.phase) * 0.3;
                ctx.fillStyle = `rgba(231,76,60,${alpha})`;
                ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = `rgba(231,76,60,${alpha * 0.4})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 14); ctx.stroke();
            });

            const scanY = ((t * 60) % (h + 40)) - 20;
            const scanGrad = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
            scanGrad.addColorStop(0, 'rgba(192,57,43,0)');
            scanGrad.addColorStop(0.5, 'rgba(192,57,43,0.1)');
            scanGrad.addColorStop(1, 'rgba(192,57,43,0)');
            ctx.fillStyle = scanGrad;
            ctx.fillRect(0, scanY - 2, w, 4);

            animFrame = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            cancelAnimationFrame(animFrame);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    );
};

export default AnimatedCanvas;
