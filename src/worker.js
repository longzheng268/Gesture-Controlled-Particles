// Cloudflare Worker to serve static files
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Serve static files
    if (path === '/' || path === '/index.html') {
      return new Response(indexHTML, {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' }
      });
    } else if (path === '/js/i18n.js') {
      return new Response(i18nJS, {
        headers: { 'Content-Type': 'application/javascript;charset=UTF-8' }
      });
    } else if (path === '/js/particles.js') {
      return new Response(particlesJS, {
        headers: { 'Content-Type': 'application/javascript;charset=UTF-8' }
      });
    } else if (path === '/js/gestures.js') {
      return new Response(gesturesJS, {
        headers: { 'Content-Type': 'application/javascript;charset=UTF-8' }
      });
    } else if (path === '/css/styles.css') {
      return new Response(stylesCSS, {
        headers: { 'Content-Type': 'text/css;charset=UTF-8' }
      });
    }

    return new Response('Not Found', { status: 404 });
  }
};

// Embedded files for Workers deployment
const indexHTML = `<!DOCTYPE html>
<html lang="zh-CN" id="app">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title data-i18n="page-title">AI 手势控制炫彩粒子系统 v2</title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <div id="loading" data-i18n="loading">正在初始化 AI 模型与高性能粒子...</div>

    <!-- Privacy Notice -->
    <div id="privacy-notice">
        <div class="privacy-content">
            <h3>🔒 <span data-i18n="privacy-title">隐私声明</span></h3>
            <p data-i18n="privacy-text">
                此应用完全在您的浏览器本地运行，不会上传任何数据到服务器。
                摄像头数据仅用于本地手势识别，不会被记录或传输。
            </p>
            <button id="privacy-accept" data-i18n="privacy-accept">我知道了</button>
        </div>
    </div>

    <div id="ui-container">
        <div class="header-row">
            <h2 data-i18n="control-title">星云控制台</h2>
            <button id="lang-toggle" class="icon-btn" title="Switch Language">🌐</button>
            <button id="menu-toggle" class="icon-btn mobile-only">☰</button>
        </div>
        
        <div class="control-group">
            <label data-i18n="shape-label">形态选择 (SHAPE)</label>
            <div class="btn-grid">
                <button class="shape-btn active" data-shape="galaxy"><span>🌌</span><span data-i18n="shape-galaxy">银河</span></button>
                <button class="shape-btn" data-shape="helix"><span>🧬</span><span data-i18n="shape-helix">DNA</span></button>
                <button class="shape-btn" data-shape="torus"><span>🍩</span><span data-i18n="shape-torus">环结</span></button>
                <button class="shape-btn" data-shape="heart"><span>❤</span><span data-i18n="shape-heart">爱心</span></button>
                <button class="shape-btn" data-shape="saturn"><span>🪐</span><span data-i18n="shape-saturn">土星</span></button>
                <button class="shape-btn" data-shape="cube"><span>🧊</span><span data-i18n="shape-cube">矩阵</span></button>
                <button class="shape-btn" data-shape="flower"><span>🌸</span><span data-i18n="shape-flower">花朵</span></button>
                <button class="shape-btn" data-shape="fireworks"><span>🎆</span><span data-i18n="shape-fireworks">烟花</span></button>
                <button class="shape-btn" data-shape="sphere"><span>🔵</span><span data-i18n="shape-sphere">球体</span></button>
            </div>
        </div>

        <div class="control-group">
            <label data-i18n="color-label">色彩主题 (COLOR SCHEME)</label>
            <select id="color-scheme">
                <option value="rainbow" data-i18n="color-rainbow">🌈 幻彩霓虹</option>
                <option value="cyberpunk" data-i18n="color-cyberpunk">🤖 赛博朋克</option>
                <option value="ocean" data-i18n="color-ocean">🌊 深海幽蓝</option>
                <option value="fire" data-i18n="color-fire">🔥 烈焰熔岩</option>
                <option value="forest" data-i18n="color-forest">🌲 精灵森林</option>
            </select>
        </div>

        <button id="fullscreen-btn" data-i18n="fullscreen-btn">⛶ 沉浸模式</button>
        
        <div class="help-text">
            <span style="color:#00f3ff" data-i18n="gesture-control-label">手势控制:</span> 
            <span data-i18n="gesture-control-text">张开双手拉远距离，或张开单手五指，控制粒子扩散。</span>
        </div>

        <!-- Privacy info in panel -->
        <div class="privacy-info">
            <span style="font-size: 12px;">🔒 <span data-i18n="privacy-local">本地运行，无隐私泄露</span></span>
        </div>
    </div>

    <video id="input-video" style="display:none" playsinline></video>
    <canvas id="webcam-preview"></canvas>

    <script type="importmap">
        {
            "imports": {
                "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
                "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
            }
        }
    </script>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>
    
    <script type="module" src="/js/i18n.js"></script>
    <script type="module" src="/js/particles.js"></script>
    <script type="module" src="/js/gestures.js"></script>
</body>
</html>`;

const stylesCSS = \`body { 
    margin: 0; 
    overflow: hidden; 
    background-color: #000; 
    font-family: 'Segoe UI', sans-serif;
    touch-action: none;
}

/* Privacy Notice */
#privacy-notice {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease-in-out;
}

#privacy-notice.hidden {
    display: none;
}

.privacy-content {
    background: linear-gradient(135deg, rgba(10, 10, 20, 0.95), rgba(20, 10, 30, 0.95));
    padding: 30px;
    border-radius: 16px;
    border: 2px solid rgba(0, 243, 255, 0.3);
    max-width: 500px;
    text-align: center;
    box-shadow: 0 0 40px rgba(0, 243, 255, 0.2);
}

.privacy-content h3 {
    color: #00f3ff;
    margin: 0 0 20px 0;
    font-size: 24px;
}

.privacy-content p {
    color: #ccc;
    line-height: 1.8;
    margin: 0 0 25px 0;
    font-size: 16px;
}

#privacy-accept {
    background: linear-gradient(45deg, #00f3ff, #ff0055);
    border: none;
    padding: 12px 40px;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    transition: transform 0.2s;
}

#privacy-accept:hover {
    transform: scale(1.05);
}

/* UI Panel */
#ui-container {
    position: absolute;
    top: 20px; 
    left: 20px; 
    z-index: 10;
    background: rgba(10, 10, 16, 0.85);
    backdrop-filter: blur(12px);
    padding: 20px; 
    border-radius: 12px;
    border: 1px solid rgba(0, 243, 255, 0.2);
    color: white; 
    width: 240px;
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.1);
    transition: transform 0.3s ease;
}

.header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
}

h2 { 
    margin: 0; 
    font-size: 16px; 
    text-transform: uppercase; 
    letter-spacing: 2px; 
    color: #00f3ff;
    flex: 1;
}

.icon-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
    margin-left: 8px;
}

.icon-btn:hover {
    background: rgba(0, 243, 255, 0.3);
}

.mobile-only {
    display: none;
}

.control-group { 
    margin-bottom: 18px; 
}

label { 
    display: block; 
    margin-bottom: 8px; 
    font-size: 12px; 
    color: #aaa; 
    font-weight: 600; 
}

/* Button Grid */
.btn-grid { 
    display: grid; 
    grid-template-columns: repeat(3, 1fr); 
    gap: 6px; 
}

button.shape-btn {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    color: #ccc; 
    padding: 6px 4px;
    border-radius: 4px; 
    cursor: pointer;
    transition: all 0.2s; 
    font-size: 10px;
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center;
}

button.shape-btn span:first-child { 
    font-size: 14px; 
    margin-bottom: 2px; 
}

button.shape-btn:hover { 
    background: rgba(0, 243, 255, 0.2); 
    color: white; 
}

button.shape-btn.active { 
    background: rgba(0, 243, 255, 0.4); 
    border-color: #00f3ff; 
    color: white; 
    box-shadow: 0 0 10px rgba(0,243,255,0.3); 
}

/* Color Scheme Dropdown */
select#color-scheme {
    width: 100%; 
    padding: 8px;
    background: rgba(0,0,0,0.5); 
    border: 1px solid rgba(0,243,255,0.3);
    border-radius: 4px; 
    color: white; 
    outline: none; 
    cursor: pointer;
}

/* Webcam Preview */
#webcam-preview {
    position: absolute; 
    bottom: 20px; 
    right: 20px;
    width: 120px; 
    height: 90px;
    border-radius: 8px; 
    border: 2px solid #ff0055;
    transform: scaleX(-1); 
    opacity: 0.6; 
    z-index: 5;
    transition: opacity 0.3s;
}

#webcam-preview:hover { 
    opacity: 1; 
}

#fullscreen-btn { 
    margin-top: 10px; 
    width: 100%; 
    background: linear-gradient(45deg, #ff0055, #ff5500); 
    border: none; 
    padding: 10px; 
    color: white; 
    border-radius: 6px; 
    cursor: pointer; 
    font-weight: bold;
}

#loading {
    position: absolute; 
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%);
    color: #00f3ff; 
    font-size: 20px; 
    z-index: 100; 
    pointer-events: none;
    text-shadow: 0 0 10px #00f3ff;
}

.help-text {
    margin-top: 12px; 
    font-size: 10px; 
    color: #888; 
    line-height: 1.4;
}

.privacy-info {
    margin-top: 15px;
    padding-top: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    color: #888;
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
    #ui-container {
        top: 10px;
        left: 10px;
        right: 10px;
        width: auto;
        max-height: 80vh;
        overflow-y: auto;
        padding: 15px;
    }

    #ui-container.collapsed {
        transform: translateY(calc(-100% + 50px));
    }

    .mobile-only {
        display: inline-block;
    }

    .btn-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
    }

    button.shape-btn {
        padding: 8px 4px;
        font-size: 9px;
    }

    button.shape-btn span:first-child {
        font-size: 18px;
    }

    #webcam-preview {
        width: 80px;
        height: 60px;
        bottom: 10px;
        right: 10px;
    }

    #loading {
        font-size: 16px;
        max-width: 80%;
        text-align: center;
    }

    h2 {
        font-size: 14px;
    }

    .privacy-content {
        padding: 20px;
        margin: 20px;
        max-width: 90%;
    }

    .privacy-content h3 {
        font-size: 20px;
    }

    .privacy-content p {
        font-size: 14px;
    }
}

@media (max-width: 480px) {
    #ui-container {
        padding: 12px;
    }

    .btn-grid {
        gap: 6px;
    }

    button.shape-btn {
        padding: 6px 2px;
        font-size: 8px;
    }

    h2 {
        font-size: 12px;
        letter-spacing: 1px;
    }
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
\`;

const i18nJS = \`// Internationalization module
const translations = {
    'zh-CN': {
        'page-title': 'AI 手势控制炫彩粒子系统 v2',
        'loading': '正在初始化 AI 模型与高性能粒子...',
        'privacy-title': '隐私声明',
        'privacy-text': '此应用完全在您的浏览器本地运行，不会上传任何数据到服务器。摄像头数据仅用于本地手势识别，不会被记录或传输。',
        'privacy-accept': '我知道了',
        'privacy-local': '本地运行，无隐私泄露',
        'control-title': '星云控制台',
        'shape-label': '形态选择 (SHAPE)',
        'shape-galaxy': '银河',
        'shape-helix': 'DNA',
        'shape-torus': '环结',
        'shape-heart': '爱心',
        'shape-saturn': '土星',
        'shape-cube': '矩阵',
        'shape-flower': '花朵',
        'shape-fireworks': '烟花',
        'shape-sphere': '球体',
        'color-label': '色彩主题 (COLOR SCHEME)',
        'color-rainbow': '🌈 幻彩霓虹',
        'color-cyberpunk': '🤖 赛博朋克',
        'color-ocean': '🌊 深海幽蓝',
        'color-fire': '🔥 烈焰熔岩',
        'color-forest': '🌲 精灵森林',
        'fullscreen-btn': '⛶ 沉浸模式',
        'gesture-control-label': '手势控制:',
        'gesture-control-text': '张开双手拉远距离，或张开单手五指，控制粒子扩散。'
    },
    'en': {
        'page-title': 'AI Gesture-Controlled Particle System v2',
        'loading': 'Initializing AI model and particles...',
        'privacy-title': 'Privacy Statement',
        'privacy-text': 'This application runs entirely in your browser locally. No data is uploaded to any server. Camera data is only used for local gesture recognition and is never recorded or transmitted.',
        'privacy-accept': 'Got it',
        'privacy-local': 'Local Only, Privacy Protected',
        'control-title': 'Nebula Console',
        'shape-label': 'Shape Selection',
        'shape-galaxy': 'Galaxy',
        'shape-helix': 'DNA',
        'shape-torus': 'Torus',
        'shape-heart': 'Heart',
        'shape-saturn': 'Saturn',
        'shape-cube': 'Matrix',
        'shape-flower': 'Flower',
        'shape-fireworks': 'Fireworks',
        'shape-sphere': 'Sphere',
        'color-label': 'Color Scheme',
        'color-rainbow': '🌈 Rainbow',
        'color-cyberpunk': '🤖 Cyberpunk',
        'color-ocean': '🌊 Ocean',
        'color-fire': '🔥 Fire',
        'color-forest': '🌲 Forest',
        'fullscreen-btn': '⛶ Fullscreen',
        'gesture-control-label': 'Gesture Control:',
        'gesture-control-text': 'Open both hands and spread them apart, or spread fingers of one hand to control particle dispersion.'
    }
};

let currentLang = 'zh-CN';

export function initI18n() {
    // Check saved language or browser language
    const savedLang = localStorage.getItem('preferred-language');
    const browserLang = navigator.language || navigator.userLanguage;
    
    if (savedLang) {
        currentLang = savedLang;
    } else if (browserLang.startsWith('en')) {
        currentLang = 'en';
    }

    updateLanguage();
    setupLanguageToggle();
}

function updateLanguage() {
    document.documentElement.lang = currentLang;
    const t = translations[currentLang];
    
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        if (t[key]) {
            if (elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA') {
                elem.placeholder = t[key];
            } else if (elem.tagName === 'OPTION') {
                elem.textContent = t[key];
            } else {
                elem.textContent = t[key];
            }
        }
    });

    // Update title
    document.title = t['page-title'];
}

function setupLanguageToggle() {
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'zh-CN' ? 'en' : 'zh-CN';
            localStorage.setItem('preferred-language', currentLang);
            updateLanguage();
        });
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const uiContainer = document.getElementById('ui-container');
    if (menuToggle && uiContainer) {
        menuToggle.addEventListener('click', () => {
            uiContainer.classList.toggle('collapsed');
        });
    }

    // Privacy notice
    const privacyNotice = document.getElementById('privacy-notice');
    const privacyAccept = document.getElementById('privacy-accept');
    
    if (privacyAccept && privacyNotice) {
        const hasAccepted = localStorage.getItem('privacy-accepted');
        if (hasAccepted) {
            privacyNotice.classList.add('hidden');
        }

        privacyAccept.addEventListener('click', () => {
            localStorage.setItem('privacy-accepted', 'true');
            privacyNotice.classList.add('hidden');
        });
    }
}

export function getCurrentLanguage() {
    return currentLang;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
} else {
    initI18n();
}
\`;

const particlesJS = \`// Particles module
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, particles, geometry, material;
const particleCount = window.innerWidth < 768 ? 10000 : 20000; // Reduce particles on mobile
let targetPositions = [];
export let interactionFactor = 0;

const shapes = {};
const colorSchemes = {};

// HSL to RGB conversion
function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) { 
        r = g = b = l; 
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1; 
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [r, g, b];
}

export function initThree() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.0025);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 40;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;

    createParticles();
    window.addEventListener('resize', onWindowResize);
    animate();
}

function createParticles() {
    geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
        colors[i*3] = 1; 
        colors[i*3+1] = 1; 
        colors[i*3+2] = 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const sprite = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/spark1.png');

    material = new THREE.PointsMaterial({
        size: 0.5,
        map: sprite,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity: 0.85,
        vertexColors: true
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    generateShapes();
    generateColorSchemes();
    
    targetPositions = shapes.galaxy;
    applyColorScheme('rainbow');
}

function generateColorSchemes() {
    // Rainbow
    colorSchemes.rainbow = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const h = i / particleCount;
        const rgb = hslToRgb(h, 0.8, 0.6);
        colorSchemes.rainbow[i*3] = rgb[0];
        colorSchemes.rainbow[i*3+1] = rgb[1];
        colorSchemes.rainbow[i*3+2] = rgb[2];
    }

    // Cyberpunk
    colorSchemes.cyberpunk = new Float32Array(particleCount * 3);
    const color1 = new THREE.Color(0x00f3ff);
    const color2 = new THREE.Color(0xff0055);
    const color3 = new THREE.Color(0x8800ff);
    for (let i = 0; i < particleCount; i++) {
        const t = Math.random();
        let finalColor;
        if(t < 0.33) finalColor = color1;
        else if (t < 0.66) finalColor = color2;
        else finalColor = color3;
        
        colorSchemes.cyberpunk[i*3] = finalColor.r;
        colorSchemes.cyberpunk[i*3+1] = finalColor.g;
        colorSchemes.cyberpunk[i*3+2] = finalColor.b;
    }

    // Ocean
    colorSchemes.ocean = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const h = 0.55 + Math.random() * 0.15;
        const l = 0.3 + Math.random() * 0.4;
        const rgb = hslToRgb(h, 0.9, l);
        colorSchemes.ocean[i*3] = rgb[0]; 
        colorSchemes.ocean[i*3+1] = rgb[1]; 
        colorSchemes.ocean[i*3+2] = rgb[2];
    }

    // Fire
    colorSchemes.fire = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const h = Math.random() * 0.15;
        const l = 0.4 + Math.random() * 0.4;
        const rgb = hslToRgb(h, 1.0, l);
        colorSchemes.fire[i*3] = rgb[0]; 
        colorSchemes.fire[i*3+1] = rgb[1]; 
        colorSchemes.fire[i*3+2] = rgb[2];
    }

    // Forest
    colorSchemes.forest = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const h = 0.25 + Math.random() * 0.15;
        const l = 0.3 + Math.random() * 0.4;
        const rgb = hslToRgb(h, 0.8, l);
        colorSchemes.forest[i*3] = rgb[0]; 
        colorSchemes.forest[i*3+1] = rgb[1]; 
        colorSchemes.forest[i*3+2] = rgb[2];
    }
}

function applyColorScheme(schemeName) {
    if (!geometry || !colorSchemes[schemeName]) return;
    const targetColors = colorSchemes[schemeName];
    const currentColors = geometry.attributes.color.array;
    
    for(let i=0; i < currentColors.length; i++) {
        currentColors[i] = targetColors[i];
    }
    geometry.attributes.color.needsUpdate = true;
}

function generateShapes() {
    shapes.sphere = getSpherePoints();
    shapes.heart = getHeartPoints();
    shapes.saturn = getSaturnPoints();
    shapes.flower = getFlowerPoints();
    shapes.fireworks = getFireworksPoints();
    shapes.helix = getHelixPoints();
    shapes.torus = getTorusKnotPoints();
    shapes.galaxy = getGalaxyPoints();
    shapes.cube = getCubeGridPoints();
}

function getHelixPoints() {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const strand = i % 2 === 0 ? 0 : Math.PI;
        const t = i / particleCount;
        const angle = t * Math.PI * 20 + strand;
        const radius = 8;
        const height = (t - 0.5) * 60;

        arr[i*3] = radius * Math.cos(angle);
        arr[i*3+1] = height;
        arr[i*3+2] = radius * Math.sin(angle);
        
        arr[i*3] += (Math.random()-0.5)*0.5;
        arr[i*3+1] += (Math.random()-0.5)*0.5;
        arr[i*3+2] += (Math.random()-0.5)*0.5;
    }
    return arr;
}

function getTorusKnotPoints() {
    const arr = new Float32Array(particleCount * 3);
    const p = 3;
    const q = 4;
    const radius = 12;
    const tube = 2.5;
    for (let i = 0; i < particleCount; i++) {
        const t = (i / particleCount) * Math.PI * 2 * p;
        const r = radius + tube * Math.cos(q * t);
        arr[i*3] = r * Math.cos(p * t);
        arr[i*3+1] = r * Math.sin(p * t);
        arr[i*3+2] = tube * Math.sin(q * t);

        arr[i*3] += (Math.random()-0.5) * 1.5;
        arr[i*3+1] += (Math.random()-0.5) * 1.5;
        arr[i*3+2] += (Math.random()-0.5) * 1.5;
    }
    return arr;
}

function getGalaxyPoints() {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const t = i / particleCount;
        const angle = t * Math.PI * 12;
        const r = Math.pow(t, 0.7) * 35;

        const armOffset = (i % 3) * (Math.PI * 2 / 3);

        arr[i*3] = r * Math.cos(angle + armOffset);
        arr[i*3+1] = (Math.random() - 0.5) * (3 - t * 2);
        arr[i*3+2] = r * Math.sin(angle + armOffset);

        arr[i*3] += (Math.random()-0.5) * 1.5;
        arr[i*3+2] += (Math.random()-0.5) * 1.5;
    }
    return arr;
}

function getCubeGridPoints() {
    const arr = new Float32Array(particleCount * 3);
    const sideCount = Math.ceil(Math.pow(particleCount, 1/3));
    const spacing = 3.5;
    const offset = (sideCount * spacing) / 2;
    
    let idx = 0;
    for(let x = 0; x < sideCount; x++) {
        for(let y = 0; y < sideCount; y++) {
            for(let z = 0; z < sideCount; z++) {
                if(idx >= particleCount) break;
                arr[idx*3] = x * spacing - offset;
                arr[idx*3+1] = y * spacing - offset;
                arr[idx*3+2] = z * spacing - offset;
                idx++;
            }
        }
    }
    return arr;
}

function getSpherePoints() {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const r = 14;
        arr[i*3] = r * Math.sin(phi) * Math.cos(theta);
        arr[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
        arr[i*3+2] = r * Math.cos(phi);
    }
    return arr;
}

function getHeartPoints() {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const t = Math.random() * Math.PI * 2;
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
        let z = (Math.random() - 0.5) * 6;
        const scale = 0.8;
        arr[i*3] = x * scale + (Math.random()-0.5)*2;
        arr[i*3+1] = y * scale + (Math.random()-0.5)*2;
        arr[i*3+2] = z;
    }
    return arr;
}

function getSaturnPoints() {
    const arr = new Float32Array(particleCount * 3);
    const ringCount = Math.floor(particleCount * 0.5);
    const sphereCount = particleCount - ringCount;
    for (let i = 0; i < sphereCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const r = 7;
        arr[i*3] = r * Math.sin(phi) * Math.cos(theta);
        arr[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
        arr[i*3+2] = r * Math.cos(phi);
    }
    for (let i = sphereCount; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = 10 + Math.random() * 10;
        const x = r * Math.cos(angle); 
        const y = (Math.random() - 0.5) * 0.8; 
        const z = r * Math.sin(angle);
        const tilt = Math.PI / 6;
        arr[i*3] = x * Math.cos(tilt) - y * Math.sin(tilt);
        arr[i*3+1] = x * Math.sin(tilt) + y * Math.cos(tilt);
        arr[i*3+2] = z;
    }
    return arr;
}

function getFlowerPoints() {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const u = Math.random() * Math.PI * 2; 
        const v = Math.random() * Math.PI;
        const k = 6; 
        const r = 15 * Math.cos(k * u) * Math.sin(v);
        arr[i*3] = r * Math.cos(u); 
        arr[i*3+1] = r * Math.sin(u); 
        arr[i*3+2] = (Math.random() - 0.5) * 8;
    }
    return arr;
}

function getFireworksPoints() {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2; 
        const phi = Math.acos((Math.random() * 2) - 1);
        const r = 2 + Math.pow(Math.random(), 2) * 40;
        arr[i*3] = r * Math.sin(phi) * Math.cos(theta); 
        arr[i*3+1] = r * Math.sin(phi) * Math.sin(theta); 
        arr[i*3+2] = r * Math.cos(phi);
    }
    return arr;
}

function animate() {
    requestAnimationFrame(animate);
    if (!particles) return;

    const positions = particles.geometry.attributes.position.array;
    const target = targetPositions;
    
    const smoothFactor = 0.06;
    const gestureScale = 1 + interactionFactor * 3.0;
    const spreadBase = interactionFactor * 1.5;

    for (let i = 0; i < particleCount; i++) {
        const ix = i * 3; 
        const iy = i * 3 + 1; 
        const iz = i * 3 + 2;
        let tx = target[ix] * gestureScale;
        let ty = target[iy] * gestureScale;
        let tz = target[iz] * gestureScale;

        if (interactionFactor > 0.05) {
            const time = Date.now() * 0.001;
            const noiseX = Math.sin(time + i * 0.1) * spreadBase * 8;
            const noiseY = Math.cos(time + i * 0.15) * spreadBase * 8;
            const noiseZ = Math.sin(time + i * 0.2) * spreadBase * 8;
            tx += noiseX; 
            ty += noiseY; 
            tz += noiseZ;
        }

        positions[ix] += (tx - positions[ix]) * smoothFactor;
        positions[iy] += (ty - positions[iy]) * smoothFactor;
        positions[iz] += (tz - positions[iz]) * smoothFactor;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    
    particles.rotation.y += 0.0015;
    particles.rotation.x += 0.0005;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export function setupUI() {
    document.querySelectorAll('.shape-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetBtn = e.currentTarget;
            document.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('active'));
            targetBtn.classList.add('active');
            const shapeKey = targetBtn.getAttribute('data-shape');
            if (shapes[shapeKey]) targetPositions = shapes[shapeKey];
        });
    });

    document.getElementById('color-scheme').addEventListener('change', (e) => {
        applyColorScheme(e.target.value);
    });

    document.getElementById('fullscreen-btn').addEventListener('click', () => {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else if (document.exitFullscreen) document.exitFullscreen();
    });
}

export function setInteractionFactor(value) {
    interactionFactor = value;
}
\`;

const gesturesJS = \`// Gesture recognition module
import { initThree, setupUI, setInteractionFactor } from '/js/particles.js';

const videoElement = document.getElementById('input-video');
const previewCanvas = document.getElementById('webcam-preview');
const previewCtx = previewCanvas.getContext('2d');
const loadingDiv = document.getElementById('loading');

function initMediaPipe() {
    const hands = new Hands({
        locateFile: (file) => \\\`https://cdn.jsdelivr.net/npm/@mediapipe/hands/\\\${file}\\\`
    });
    
    hands.setOptions({ 
        maxNumHands: 2, 
        modelComplexity: 1, 
        minDetectionConfidence: 0.5, 
        minTrackingConfidence: 0.5 
    });
    
    hands.onResults(onHandsResults);

    const cameraUtils = new Camera(videoElement, {
        onFrame: async () => { 
            await hands.send({image: videoElement}); 
        },
        width: 320, 
        height: 240
    });
    
    cameraUtils.start()
        .then(() => { 
            loadingDiv.style.display = 'none'; 
            console.log("Camera started"); 
        })
        .catch(err => { 
            loadingDiv.innerText = "Camera failed. Please check permissions."; 
            loadingDiv.style.color = 'red'; 
        });
}

function onHandsResults(results) {
    previewCtx.save();
    previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    previewCtx.drawImage(results.image, 0, 0, previewCanvas.width, previewCanvas.height);
    
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        let factor = 0;
        if (results.multiHandLandmarks.length === 2) {
            const hand1 = results.multiHandLandmarks[0][9];
            const hand2 = results.multiHandLandmarks[1][9];
            const distance = Math.sqrt(
                Math.pow(hand1.x - hand2.x, 2) + 
                Math.pow(hand1.y - hand2.y, 2)
            );
            factor = (distance - 0.15) * 2.5;
        } else {
            const lm = results.multiHandLandmarks[0];
            const thumb = lm[4]; 
            const pinky = lm[20];
            const distance = Math.sqrt(
                Math.pow(thumb.x - pinky.x, 2) + 
                Math.pow(thumb.y - pinky.y, 2)
            );
            factor = (distance - 0.1) * 5;
        }
        setInteractionFactor(Math.max(0, Math.min(1, factor)));
        
        for (const landmarks of results.multiHandLandmarks) {
            for(const point of landmarks) {
                previewCtx.beginPath();
                previewCtx.arc(
                    point.x * previewCanvas.width, 
                    point.y * previewCanvas.height, 
                    3, 0, 2 * Math.PI
                );
                previewCtx.fillStyle = "#ff0055";
                previewCtx.fill();
            }
        }
    } else {
        setInteractionFactor(interactionFactor * 0.92);
    }
    previewCtx.restore();
}

// Initialize everything
initThree();
setupUI();
initMediaPipe();
\`;
