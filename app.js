// A.U.R.O.R.A. Mission 1 - Advanced IDE JavaScript

class AuroraIDE {
    constructor() {
        this.currentModule = null;
        this.completedModules = new Set();
        this.currentTutorialStep = 1;
        this.audioContext = null;
        this.timerInterval = null;
        this.startTime = 0;
        this.feedbackTimeout = null;
        
        // Tutorial data - (sin cambios)
        this.tutorialSteps = [
            {
                step: 1,
                title: "Bienvenido/a, Ingeniero/a Senior",
                description: "La corrupción ha alcanzado el núcleo lógico de A.U.R.O.R.A. Tu misión es auditar 6 módulos en busca de errores sutiles de lógica, estado y sintaxis.",
                icon: "👨‍💻"
            },
            {
                step: 2,
                title: "Explorador de Archivos Avanzado",
                description: "Tu acceso ha sido ampliado. Navega por la estructura de archivos del sistema para seleccionar un módulo.",
                icon: "📁"
            },
            {
                step: 3,
                title: "Entorno de Desarrollo Profesional",
                description: "Este es tu entorno de desarrollo. Nota el resaltado de sintaxis avanzado y la capacidad de navegación mejorada.",
                icon: "💻"
            },
            {
                step: 4,
                title: "¡ALERTA DE CÓDIGO COMENTADO!",
                description: "¡CUIDADO! Un simple '//' puede desactivar una línea de código vital. Si ves un comando importante en gris, podría ser un error. Bórralo para reactivarlo.",
                icon: "⚠️"
            },
            {
                step: 5,
                title: "Documentación y Consola Avanzada",
                description: "Tu documentación ahora incluye detalles sobre operadores lógicos. La nueva consola de salida mostrará mensajes y errores en tiempo real.",
                icon: "📚"
            },
            {
                step: 6,
                title: "Interfaz Responsiva",
                description: "En dispositivos móviles, la documentación y la consola se ubicarán en la parte inferior para optimizar el espacio.",
                icon: "📱"
            },
            {
                step: 7,
                title: "Iniciar Auditoría",
                description: "¡Todo listo! Comienza tu auditoría de código profesional.",
                icon: "🚀"
            }
        ];

        // Module data - (sin cambios, ya estaban actualizados)
        this.modules = {
             energia: {
                id: "energia",
                name: "Modulo_GestionDeEnergia.js",
                icon: "⚡",
                corruptCode: `// Protocolo de distribución de energía v3.1
function gestionarCicloEnergia(datosSensor) {
  // Constantes de operación
  const CAPACIDAD_MAXIMA = 5000;
  const NIVEL_CRITICO = 1000;
  const UMBRAL_PANELES = 2500;
  
  let consumoActual = datosSensor.consumo;
  let nivelBateria = datosSensor.bateria;
  let estadoSistema = "Estable";

  // Función interna para diagnóstico de reserva
  function verificarReserva(bateria) {
    if (bateria < NIVEL_CRITICO) {
      // activarModoAhorro();
      return "Emergencia";
    }
    return "Normal"
  }

  if (nivelBateria <= UMBRAL_PANELES) {
    console.log("Activando paneles solares por bajo nivel.");
    activarPanelesSolares();
  }

  // Lógica de distribución principal
  if (consumoActual > nivelBateria) {
    estadoSistema = "Déficit Energético"
    // Redireccionar energía de sistemas no críticos
    // redigirEnergia(consumoActual, nivelBateria);
  } else if (nivelBateria = CAPACIDAD_MAXIMA) {
    console.log("Batería llena, desactivando carga.");
  }
  
  return estadoSistema;
}`,
                correctCode: `// Protocolo de distribución de energía v3.1
function gestionarCicloEnergia(datosSensor) {
  // Constantes de operación
  const CAPACIDAD_MAXIMA = 5000;
  const NIVEL_CRITICO = 1000;
  const UMBRAL_PANELES = 2500;
  
  let consumoActual = datosSensor.consumo;
  let nivelBateria = datosSensor.bateria;
  let estadoSistema = "Estable";

  // Función interna para diagnóstico de reserva
  function verificarReserva(bateria) {
    if (bateria < NIVEL_CRITICO) {
      activarModoAhorro();
      return "Emergencia";
    }
    return "Normal";
  }

  if (nivelBateria <= UMBRAL_PANELES) {
    console.log("Activando paneles solares por bajo nivel.");
    activarPanelesSolares();
  }

  // Lógica de distribución principal
  if (consumoActual > nivelBateria) {
    estadoSistema = "Déficit Energético";
    // Redireccionar energía de sistemas no críticos
    redigirEnergia(consumoActual, nivelBateria);
  } else if (nivelBateria == CAPACIDAD_MAXIMA) {
    console.log("Batería llena, desactivando carga.");
  }
  
  return estadoSistema;
}`,
            },
            navegacion: {
                id: "navegacion",
                name: "Modulo_NavegacionAvanzada.js",
                icon: "🗺️",
                corruptCode: `// Sistema de Navegación Inercial Asistida
function calcularVectorDeRuta(coordenadas) {
  let velocidadCrucero = 1500; // en km/h
  const DISTANCIA_LARGA = 100000; // en km
  const VELOCIDAD_WARP = 9500;

  // Función anidada para calcular consumo de combustible
  function estimarConsumo(distancia, velocidad) {
    let factor = velocidad > 2000 ? 1.5 : 1.1
    // La fórmula de consumo es compleja.
    let consumoEstimado = (distancia / velocidad) * factor;
    // return consumoEstimado
  }

  // Ajuste de velocidad para rutas largas
  if (coordenadas.distanciaTotal > DISTANCIA_LARGA); {
    console.log("Ruta interestelar detectada. Activando protocolo WARP.");
    velocidadCrucero = VELOCIDAD_WARP
  }

  let tiempoEstimado = coordenadas.distanciaTotal / velocidadCrucero
  let consumoFinal = estimarConsumo(coordenadas.distanciaTotal, velocidadCrucero);

  if (coordenadas.hayObstaculos == true) {
    console.log("¡ALERTA! recalculando por obstáculos.");
    // recalcularRutaEvasiva(coordenadas.obstaculos);
  }
  
  console.log("Cálculo de vector finalizado.");
  return {
    velocidad: velocidadCrucero,
    tiempo: tiempoEstimado,
    consumo: consumoFinal,
  }
}`,
                correctCode: `// Sistema de Navegación Inercial Asistida
function calcularVectorDeRuta(coordenadas) {
  let velocidadCrucero = 1500; // en km/h
  const DISTANCIA_LARGA = 100000; // en km
  const VELOCIDAD_WARP = 9500;

  // Función anidada para calcular consumo de combustible
  function estimarConsumo(distancia, velocidad) {
    let factor = velocidad > 2000 ? 1.5 : 1.1;
    // La fórmula de consumo es compleja.
    let consumoEstimado = (distancia / velocidad) * factor;
    return consumoEstimado;
  }

  // Ajuste de velocidad para rutas largas
  if (coordenadas.distanciaTotal > DISTANCIA_LARGA) {
    console.log("Ruta interestelar detectada. Activando protocolo WARP.");
    velocidadCrucero = VELOCIDAD_WARP;
  }

  let tiempoEstimado = coordenadas.distanciaTotal / velocidadCrucero;
  let consumoFinal = estimarConsumo(coordenadas.distanciaTotal, velocidadCrucero);

  if (coordenadas.hayObstaculos == true) {
    console.log("¡ALERTA! recalculando por obstáculos.");
    recalcularRutaEvasiva(coordenadas.obstaculos);
  }
  
  console.log("Cálculo de vector finalizado.");
  return {
    velocidad: velocidadCrucero,
    tiempo: tiempoEstimado,
    consumo: consumoFinal,
  };
}`,
            },
            comunicaciones: {
                id: "comunicaciones",
                name: "Modulo_Comunicaciones.js",
                icon: "🛰️",
                corruptCode: `// Protocolo de Transmisión de Datos Cuánticos
function procesarYEnviarPaquete(datos) {
  const POTENCIA_MINIMA = 75;
  const TASA_ENCRIPTACION = 128;

  function encriptar(data, tasa) {
    if (!data) {
      return null
    }
    console.log("Encriptando con tasa " + tasa + "...");
    // Simulación de encriptación
    let encriptado = "ENC_" + data.substring(0, 10)
    return encriptado;
  }
  
  let paqueteEncriptado = encriptar(datos.mensaje, TASA_ENCRIPTACION);
  let potenciaTransmision = datos.potencia;
  
  // Verificación de la potencia
  if (potenciaTransmision < POTENCIA_MINIMA) {
    // console.log("Potencia insuficiente, aumentando...");
    potenciaTransmision = POTENCIA_MINIMA;
  }

  if (paqueteEncriptado = null) {
    console.log("Error: Paquete vacío, abortando transmisión."
    return false;
  } else {
    // Transmitir el paquete de datos
    transmitirPaquete(paqueteEncriptado, potenciaTransmision);
  }
}`,
                correctCode: `// Protocolo de Transmisión de Datos Cuánticos
function procesarYEnviarPaquete(datos) {
  const POTENCIA_MINIMA = 75;
  const TASA_ENCRIPTACION = 128;

  function encriptar(data, tasa) {
    if (!data) {
      return null;
    }
    console.log("Encriptando con tasa " + tasa + "...");
    // Simulación de encriptación
    let encriptado = "ENC_" + data.substring(0, 10);
    return encriptado;
  }
  
  let paqueteEncriptado = encriptar(datos.mensaje, TASA_ENCRIPTACION);
  let potenciaTransmision = datos.potencia;
  
  // Verificación de la potencia
  if (potenciaTransmision < POTENCIA_MINIMA) {
    console.log("Potencia insuficiente, aumentando...");
    potenciaTransmision = POTENCIA_MINIMA;
  }

  if (paqueteEncriptado == null) {
    console.log("Error: Paquete vacío, abortando transmisión.");
    return false;
  } else {
    // Transmitir el paquete de datos
    transmitirPaquete(paqueteEncriptado, potenciaTransmision);
  }
}`,
            },
            diagnostico: {
                id: "diagnostico",
                name: "Modulo_Diagnostico.js",
                icon: "🩺",
                corruptCode: `// Sistema de Autodiagnóstico y Mantenimiento Predictivo
function ejecutarDiagnosticoProfundo() {
  const TEMP_MAXIMA_CPU = 85; // Grados Celsius
  const PRESION_MINIMA_CABINA = 90; // kPa

  let informe = {
    cpu: { temp: 92, estado: "OK" },
    cabina: { presion: 88, estado: "OK" },
    general: "Sin Novedad",
  };

  // Verificación de temperatura del núcleo
  if (informe.cpu.temp > TEMP_MAXIMA_CPU%) {
    informe.cpu.estado = "Sobrecalentamiento Crítico";
    // activarSistemaRefrigeracionForzada();
  }

  // Verificación de presión en la cabina
  if (informe.cabina.presion < PRESION_MINIMA_CABINA) {
    informe.cabina.estado = "Despresurización";
    sellarCompuertas()
  }

  // Generación del informe final
  if (informe.cpu.estado !== "OK" || informe.cabina.estado !== "OK") {
    informe.general = "¡ALERTA MÚLTIPLE DETECTADA!";
  } else {
    informe.general = "Todos los sistemas operan normalmente";
  }

  console.log(informe.general)
  return informe
}`,
                correctCode: `// Sistema de Autodiagnóstico y Mantenimiento Predictivo
function ejecutarDiagnosticoProfundo() {
  const TEMP_MAXIMA_CPU = 85; // Grados Celsius
  const PRESION_MINIMA_CABINA = 90; // kPa

  let informe = {
    cpu: { temp: 92, estado: "OK" },
    cabina: { presion: 88, estado: "OK" },
    general: "Sin Novedad",
  };

  // Verificación de temperatura del núcleo
  if (informe.cpu.temp > TEMP_MAXIMA_CPU) {
    informe.cpu.estado = "Sobrecalentamiento Crítico";
    activarSistemaRefrigeracionForzada();
  }

  // Verificación de presión en la cabina
  if (informe.cabina.presion < PRESION_MINIMA_CABINA) {
    informe.cabina.estado = "Despresurización";
    sellarCompuertas();
  }

  // Generación del informe final
  if (informe.cpu.estado !== "OK" || informe.cabina.estado !== "OK") {
    informe.general = "¡ALERTA MÚLTIPLE DETECTADA!";
  } else {
    informe.general = "Todos los sistemas operan normalmente";
  }

  console.log(informe.general);
  return informe;
}`,
            },
            seguridad: {
                id: "seguridad",
                name: "Modulo_Seguridad.js",
                icon: "🔒",
                corruptCode: `// Protocolo de Escudos Deflectores y Contramedidas
function gestionarAmenazas(datosRadar) {
  // Distancia de activación de escudos (en metros)
  const DISTANCIA_CRITICA = 1000;
  
  let amenaza = datosRadar.getAmenazaMasCercana();
  let estadoEscudos = "Inactivo";
  
  if (amenaza) {
    console.log("Amenaza detectada a " + amenaza.distancia + " metros.");
    
    // Lógica de activación de escudos
    if (amenaza.distancia < DISTANCIA_CRITICA); {
      estadoEscudos = "¡ESCUDOS AL MÁXIMO!";
      activarEscudos(100)
    }

    // Lógica de contramedidas
    if (amenaza.tipo == "proyectil") {
      // desplegarContramedidas();
    } else if (amenaza.tipo == "interferencia") {
      console.log("Activando contramedidas electrónicas")
      // activarECM();
    }
  } else {
    estadoEscudos = "Sin amenazas en el sector"
    console.log(estadoEscudos);
  }
  
  return estadoEscudos;
}`,
                correctCode: `// Protocolo de Escudos Deflectores y Contramedidas
function gestionarAmenazas(datosRadar) {
  // Distancia de activación de escudos (en metros)
  const DISTANCIA_CRITICA = 1000;
  
  let amenaza = datosRadar.getAmenazaMasCercana();
  let estadoEscudos = "Inactivo";
  
  if (amenaza) {
    console.log("Amenaza detectada a " + amenaza.distancia + " metros.");
    
    // Lógica de activación de escudos
    if (amenaza.distancia < DISTANCIA_CRITICA) {
      estadoEscudos = "¡ESCUDOS AL MÁXIMO!";
      activarEscudos(100);
    }

    // Lógica de contramedidas
    if (amenaza.tipo == "proyectil") {
      desplegarContramedidas();
    } else if (amenaza.tipo == "interferencia") {
      console.log("Activando contramedidas electrónicas");
      activarECM();
    }
  } else {
    estadoEscudos = "Sin amenazas en el sector";
    console.log(estadoEscudos);
  }
  
  return estadoEscudos;
}`,
            },
            recoleccion: {
                id: "recoleccion",
                name: "Modulo_Recoleccion.js",
                icon: "🗿",
                corruptCode: `// Sistema Automatizado de Recolección y Análisis de Muestras
function procesarMuestra(muestra) {
  
  const UMBRAL_CALIDAD = 95;
  const TIPOS_VALIDOS = ['hielo', 'mineral', 'organico'];
  
  let decision = "Rechazada";
  
  // Función para verificar si el tipo es válido
  function esTipoValido(tipo) {
    return TIPOS_VALIDOS.includes(tipo);
  }

  console.log("Analizando muestra tipo: " + muestra.tipo);

  if (esTipoValido(muestra.tipo)) {
    
    // Análisis de calidad solo para tipos válidos
    if (muestra.calidad > 95%) {
      decision = "Aceptada para Almacenamiento";
      // almacenarMuestraEnBodega(muestra);
      
    } else {
      decision = "Rechazada por baja calidad";
    }

  } else {
    decision = "Rechazada por tipo inválido";
  }
  
  registrarDecision(muestra.id, decision)
  return decision;
`,
                correctCode: `// Sistema Automatizado de Recolección y Análisis de Muestras
function procesarMuestra(muestra) {
  
  const UMBRAL_CALIDAD = 95;
  const TIPOS_VALIDOS = ['hielo', 'mineral', 'organico'];
  
  let decision = "Rechazada";
  
  // Función para verificar si el tipo es válido
  function esTipoValido(tipo) {
    return TIPOS_VALIDOS.includes(tipo);
  }

  console.log("Analizando muestra tipo: " + muestra.tipo);

  if (esTipoValido(muestra.tipo)) {
    
    // Análisis de calidad solo para tipos válidos
    if (muestra.calidad > 95) {
      decision = "Aceptada para Almacenamiento";
      almacenarMuestraEnBodega(muestra);
      
    } else {
      decision = "Rechazada por baja calidad";
    }

  } else {
    decision = "Rechazada por tipo inválido";
  }
  
  registrarDecision(muestra.id, decision);
  return decision;
}`,
            }
        };

        this.initAudio();
        this.initTutorial();
        this.bindEvents();
    }

    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    playSound(frequency, duration = 200, type = 'sine') {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration / 1000);
    }

    playUISound() { this.playSound(800, 150); }
    playTypingSound() { this.playSound(400, 100); }
    playSuccessSound() {
        [523, 659, 784].forEach((freq, i) => {
            setTimeout(() => this.playSound(freq, 300), i * 100);
        });
    }
    playErrorSound() { this.playSound(200, 500, 'sawtooth'); }
    
    // --- MÉTODOS DE LA CONSOLA ELIMINADOS ---

    showFeedback(message, type) {
        const feedbackBar = document.getElementById('feedback-bar');
        if (!feedbackBar) return;

        // Limpiar timeout anterior si existe
        clearTimeout(this.feedbackTimeout);

        feedbackBar.textContent = message;
        feedbackBar.className = `feedback-bar ${type}`; // Reemplaza todas las clases
        
        // Mostrar la barra
        feedbackBar.classList.remove('hidden');

        // Ocultar después de 3 segundos
        this.feedbackTimeout = setTimeout(() => {
            feedbackBar.classList.add('hidden');
        }, 3000);
    }
    
    initTutorial() {
        this.updateTutorialStep(1);
    }

    updateTutorialStep(step) {
        const stepData = this.tutorialSteps[step - 1];
        if (!stepData) return;

        document.getElementById('currentStep').textContent = step;
        document.getElementById('tutorialTitle').textContent = stepData.title;
        document.getElementById('tutorialIcon').textContent = stepData.icon;
        document.getElementById('tutorialText').textContent = stepData.description;

        const prevBtn = document.getElementById('tutorialPrev');
        const nextBtn = document.getElementById('tutorialNext');
        const startBtn = document.getElementById('tutorialStart');

        prevBtn.style.display = step === 1 ? 'none' : 'inline-flex';
        
        if (step === 7) {
            nextBtn.classList.add('hidden');
            startBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            startBtn.classList.add('hidden');
        }

        this.currentTutorialStep = step;
    }

    bindEvents() {
        // Tutorial navigation
        document.getElementById('tutorialPrev').addEventListener('click', () => {
            this.playUISound();
            if (this.currentTutorialStep > 1) this.updateTutorialStep(this.currentTutorialStep - 1);
        });

        document.getElementById('tutorialNext').addEventListener('click', () => {
            this.playUISound();
            if (this.currentTutorialStep < 7) this.updateTutorialStep(this.currentTutorialStep + 1);
        });

        document.getElementById('tutorialStart').addEventListener('click', () => {
            this.playUISound();
            this.startMission();
        });

        // File explorer
        document.querySelectorAll('.file-item').forEach(item => {
            item.addEventListener('click', () => {
                this.playUISound();
                this.loadModule(item.dataset.module);
            });
        });

        // Editor controls
        document.getElementById('compileBtn').addEventListener('click', () => {
            this.playUISound();
            this.compileCode();
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            this.playUISound();
            this.resetModule();
        });

        // --- EVENTO DEL BOTÓN DE LIMPIAR CONSOLA ELIMINADO ---

        // Code area typing
        const codeArea = document.getElementById('codeArea');
        let typingTimeout;
        codeArea.addEventListener('input', () => {
            clearTimeout(typingTimeout);
            typingTimeout = setTimeout(() => this.playTypingSound(), 50);
            this.updateLineNumbers();
        });

        // Completion screen events
        document.getElementById('copyPasswordBtn').addEventListener('click', () => {
            this.playUISound();
            this.copyPassword();
        });

        document.getElementById('returnToTerminal').addEventListener('click', () => {
            this.playUISound();
            this.returnToTerminal();
        });
    }

    startMission() {
        document.getElementById('tutorialModal').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        // --- LLAMADA A LA CONSOLA ELIMINADA ---
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    }

    updateTimer() {
        const timerElement = document.getElementById('missionTimer');
        if (!timerElement) return;
        const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, '0');
        const seconds = (elapsedTime % 60).toString().padStart(2, '0');
        timerElement.textContent = `${minutes}:${seconds}`;
    }

    loadModule(moduleId) {
        const module = this.modules[moduleId];
        if (!module) return;

        document.querySelectorAll('.file-item').forEach(item => item.classList.remove('active'));
        document.querySelector(`[data-module="${moduleId}"]`).classList.add('active');

        this.currentModule = moduleId;
        document.getElementById('currentFileName').textContent = module.name;
        document.getElementById('codeArea').value = module.corruptCode;
        
        document.getElementById('compileBtn').disabled = false;
        document.getElementById('resetBtn').disabled = false;

        this.updateLineNumbers();
        // --- LLAMADAS A LA CONSOLA ELIMINADAS ---
    }

    updateLineNumbers() {
        const codeArea = document.getElementById('codeArea');
        const lineNumbers = document.getElementById('lineNumbers');
        const lines = codeArea.value.split('\n').length;
        let lineNumbersHTML = '';
        for (let i = 1; i <= lines; i++) {
            lineNumbersHTML += `<div class="line-number">${i}</div>`;
        }
        lineNumbers.innerHTML = lineNumbersHTML;
    }

    compileCode() {
        if (!this.currentModule) return;

        const currentCode = document.getElementById('codeArea').value.trim();
        const module = this.modules[this.currentModule];
        const correctCode = module.correctCode.trim();

        // --- MENSAJE DE COMPILACIÓN ELIMINADO ---

        setTimeout(() => {
            if (this.normalizeCode(currentCode) === this.normalizeCode(correctCode)) {
                this.playSuccessSound();
                this.showFeedback('✅ ¡COMPILACIÓN EXITOSA! Módulo reparado.', 'success');
                this.markModuleComplete(this.currentModule);
            } else {
                this.playErrorSound();
                // --- BUCLE DE ERRORES ELIMINADO ---
                this.showFeedback('❌ ERRORES DETECTADOS. Revisa la sintaxis del código.', 'error');
            }
        }, 500); // Reducido el tiempo de espera
    }

    normalizeCode(code) {
        return code.replace(/\s+/g, ' ').replace(/\s*([{}();,])\s*/g, '$1').trim();
    }

    markModuleComplete(moduleId) {
        this.completedModules.add(moduleId);
        
        const fileItem = document.querySelector(`[data-module="${moduleId}"]`);
        fileItem.querySelector('.file-status').textContent = '🟢';

        document.getElementById('completedModules').textContent = this.completedModules.size;

        if (this.completedModules.size === 6) {
            clearInterval(this.timerInterval);
            setTimeout(() => this.showCompletionScreen(), 2000);
        }
    }

    resetModule() {
        if (!this.currentModule) return;
        const module = this.modules[this.currentModule];
        document.getElementById('codeArea').value = module.corruptCode;
        this.updateLineNumbers();
        // --- MENSAJE DE REINICIO ELIMINADO ---
    }

    showCompletionScreen() {
        this.playSuccessSound();
        document.getElementById('mainApp').classList.add('hidden');
        document.getElementById('completionScreen').classList.remove('hidden');
        
        setTimeout(() => {
            const password = this.generatePassword();
            document.getElementById('generatedPassword').textContent = password;
        }, 2000);
    }

    generatePassword() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*-/.';
        const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];
        return `AURORA${getRandomChar()}M${getRandomChar()}I${getRandomChar()}S${getRandomChar()}I${getRandomChar()}O${getRandomChar()}N${getRandomChar()}2`;
    }

    async copyPassword() {
        const password = document.getElementById('generatedPassword').textContent;
        try {
            await navigator.clipboard.writeText(password);
            this.showTemporaryMessage('Contraseña copiada al portapapeles!');
        } catch (err) {
            const textArea = document.createElement('textarea');
            textArea.value = password;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showTemporaryMessage('Contraseña copiada!');
        }
    }

    showTemporaryMessage(message) {
        const button = document.getElementById('copyPasswordBtn');
        const originalText = button.textContent;
        button.textContent = `✅ ${message}`;
        button.style.background = '#00ff88';
        button.style.color = '#000';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.color = '';
        }, 2000);
    }

    returnToTerminal() {
        window.open('https://gnius-club.github.io/AURORA', '_blank');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.aurora = new AuroraIDE();
});

// Resume audio context on user interaction
document.addEventListener('click', function resumeAudio() {
    if (window.aurora && window.aurora.audioContext && window.aurora.audioContext.state === 'suspended') {
        window.aurora.audioContext.resume();
    }
}, { once: true });
