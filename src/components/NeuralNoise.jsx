import React, { useEffect, useRef } from 'react';

const NeuralNoise = ({ color = [0.9, 0.2, 0.4], opacity = 0.95, speed = 0.001 }) => {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, tX: 0, tY: 0 });
  const frameIdRef = useRef(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const gl = canvasEl.getContext('webgl', { alpha: true }) || canvasEl.getContext('experimental-webgl', { alpha: true });
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    glRef.current = gl;

    const vsSource = `
      precision mediump float;
      varying vec2 vUv;
      attribute vec2 a_position;
      void main() {
        vUv = 0.5 * (a_position + 1.0);
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_ratio;
      uniform vec2 u_pointer_position;
      uniform vec3 u_color;
      uniform float u_speed;

      vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
      }

      float neuro_shape(vec2 uv, float t, float p) {
        vec2 sine_acc = vec2(0.0);
        vec2 res = vec2(0.0);
        float scale = 8.0;
        for (int j = 0; j < 15; j++) {
          uv = rotate(uv, 1.0);
          sine_acc = rotate(sine_acc, 1.0);
          vec2 layer = uv * scale + float(j) + sine_acc - t;
          sine_acc += sin(layer) + 2.4 * p;
          res += (0.5 + 0.5 * cos(layer)) / scale;
          scale *= 1.2;
        }
        return res.x + res.y;
      }

      void main() {
        vec2 uv = vUv;
        uv.x *= u_ratio;
        
        vec2 pointer = vUv - u_pointer_position;
        pointer.x *= u_ratio;
        float p = clamp(length(pointer), 0.0, 1.0);
        p = 0.5 * pow(1.0 - p, 2.0);
        
        float t = u_speed * u_time;
        float noise = neuro_shape(uv, t, p);
        
        noise = 1.5 * pow(noise, 3.0);
        noise += pow(noise, 10.0);
        noise = max(0.0, noise - 0.4); /* Lowered threshold to make it more visible */
        noise *= (1.2 - length(vUv - 0.5));
        
        vec3 col = u_color * noise;
        gl_FragColor = vec4(col, noise);
      }
    `;

    const createShader = (gl, source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vs = createShader(gl, vsSource, gl.VERTEX_SHADER);
    const fs = createShader(gl, fsSource, gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const uniforms = {
      u_time: gl.getUniformLocation(program, 'u_time'),
      u_ratio: gl.getUniformLocation(program, 'u_ratio'),
      u_pointer_position: gl.getUniformLocation(program, 'u_pointer_position'),
      u_color: gl.getUniformLocation(program, 'u_color'),
      u_speed: gl.getUniformLocation(program, 'u_speed'),
    };

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.uniform3f(uniforms.u_color, color[0], color[1], color[2]);
    gl.uniform1f(uniforms.u_speed, speed);

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvasEl.width = window.innerWidth * dpr;
      canvasEl.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvasEl.width, canvasEl.height);
      gl.uniform1f(uniforms.u_ratio, canvasEl.width / canvasEl.height);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const onMove = (e) => {
      pointerRef.current.tX = e.clientX;
      pointerRef.current.tY = e.clientY;
    };
    window.addEventListener('pointermove', onMove);

    const render = (time) => {
      const p = pointerRef.current;
      p.x += (p.tX - p.x) * 0.1;
      p.y += (p.tY - p.y) * 0.1;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      gl.uniform1f(uniforms.u_time, time);
      gl.uniform2f(uniforms.u_pointer_position, p.x / window.innerWidth, 1 - p.y / window.innerHeight);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frameIdRef.current = requestAnimationFrame(render);
    };

    frameIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frameIdRef.current);
    };
  }, [color, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity,
        zIndex: -1, /* Stay behind */
        background: 'transparent',
      }}
    />
  );
};

export default NeuralNoise;
