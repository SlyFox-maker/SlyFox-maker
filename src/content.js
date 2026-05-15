// Редактируемый контент портфолио.
// Добавляй новые языки в supportedLangs и translations с теми же ключами, что у en/es/ru.
window.portfolioContent = {
    defaultLang: "en",
    supportedLangs: ["en", "es", "ru"],
    contacts: [
        {
            label: "Email",
            href: "mailto:egorpavlov024@gmail.com",
            iconClass: "fas fa-envelope",
        },
        {
            label: "Telegram",
            href: "https://t.me/Slyfoxy",
            iconClass: "fab fa-telegram-plane",
        },
        {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/egor-pavlov-824b02281/",
            iconClass: "fab fa-linkedin",
        },
        {
            label: "GitHub",
            href: "https://github.com/SlyFox-maker/SlyFox-maker",
            iconClass: "fab fa-github",
        },
    ],
    translations: {
        en: {
            title: "Versatile Fullstack & DevOps Engineer",
            intro: "Hi! I'm Egor Pavlov — a full-cycle developer working across web, desktop, and infrastructure layers. I design and build end-to-end software solutions with a focus on architecture, efficiency, and visual polish. Whether it's a complex integration, backend logic, or automation pipeline — I bring the code to life with engineering mindset and creative precision.",
            skills: "Key Skills",
            skills_list: ["Fullstack development (frontend + backend)", "Languages: C++, C#, Python, Java, JavaScript, PHP", "Frameworks & libraries: Django, Vue.js, Node.js, Qt, .NET", "Desktop apps: Qt, WinForms, JavaFX, .NET", "DevOps: Linux, Git, Docker, CI/CD, automation", "CRM/API integrations (Bitrix24, amoCRM, custom webhooks)", "Databases: PostgreSQL, MySQL, SQLite, MongoDB", "Working with REST APIs, JSON, XML, WebSocket"],
            projects: "Projects",

            project_list: [
                {
                    name: "Online Booking and Access Control (SCUD) Integration Platform",
                    role: "Lead developer: backend, frontend, Docker deployment, CRM and access-control integration.",
                    impact: "Unified booking, payments, Bitrix24 synchronization, and room access management in one production system.",
                    stack: ["Django", "Docker", "Bitrix24", "PHP", "WebSocket"],
                    file: ["./projects/24reson/1.png", "./projects/24reson/2.png", "./projects/24reson/3.png"],
                    desc: "Commercial project for a company combining online meeting room and tariff booking with integration into the access control system (SCUD) and Bitrix24 CRM. I implemented the backend in Django using Docker, ensuring convenient deployment and environment management. The system includes user registration, personal dashboard, booking calendar, and data synchronization with Bitrix24. Configured automatic creation of client, deal, and product cards in the CRM, as well as access management to premises via SCUD. Developed a SCUD server in pure PHP with command exchange via WebSocket and logging of all access events. The system supports bidirectional synchronization, payment processing, and dynamic management of branches, tariffs, and rooms. Led a team of 3 people, handling most of the backend and frontend work.",
                },
                {
                    name: "PWA Application for Client Notifications and Legal Support",
                    role: "Backend owner: API architecture, Docker setup, Bitrix24 integration, Telegram bot connection.",
                    impact: "Gave clients a personal dashboard for debts, payments, notifications, and direct legal support.",
                    stack: ["Flask", "Docker", "Vue", "Bitrix24", "Telegram API"],
                    file: ["./projects/pwa_site/1.png"],
                    desc: "Commercial Progressive Web App project for client interaction with the company’s legal department. Developed an API server in Flask (Python) using Docker as the central component to integrate the app with Bitrix24 CRM and a Telegram bot. Clients can view debts, receive notifications, pay for services, and contact lawyers directly through their personal dashboard. Each client has an individual case with status tracking. Frontend was developed in Vue.js (Vite); I personally handled backend integration and business logic. Worked in a team of 3 people, responsible for the entire server side, Docker setup, and backend integration with the layout made by other developers.",
                },
                {
                    name: "Story-driven Minecraft Mod with Unique Gameplay Mechanics",
                    role: "Gameplay programmer: event systems, NPC logic, bosses, triggers, and progression mechanics.",
                    impact: "Turned a server into a story-driven adventure with dynamic music, allies, enemies, and multiple endings.",
                    stack: ["Java", "Spigot", "Game Logic", "Events"],
                    file: ["./projects/strangers_in_rosaville/1.png", "./projects/strangers_in_rosaville/2.png", "./projects/strangers_in_rosaville/3.png", "./projects/strangers_in_rosaville/4.png"],
                    desc: "Java Spigot project for Minecraft servers turning the game into a full-fledged adventure with story, secrets, and dynamic events. Developed a background music system that changes depending on location and map triggers. Created friendly NPCs that can talk, follow the player, and assist in progression, as well as enemy NPCs with unique personalities and possible plot twists (an enemy can become an ally). Implemented boss fights, multiple endings, and interactive mechanics, including custom tools and skins. Worked in a team of 2: I handled all programming and coding, while another developer worked on skins, design, and story. I also contributed to content and story creation. The project showcases skills in complex game system development, event management, and integration of various mechanics.",
                },
                {
                    name: "Personal Cloud Storage (Google Drive Alternative)",
                    role: "Solo developer: product logic, backend, frontend, admin tools, and Docker environment.",
                    impact: "Built a working private cloud with storage quotas and full file management workflows.",
                    stack: ["Django", "Docker", "Bootstrap", "jQuery"],
                    file: ["./projects/fileExchange/1.png", "./projects/fileExchange/2.png", "./projects/fileExchange/3.png"],
                    desc: "Personal project in Django with Docker, Bootstrap, and jQuery functioning as personal cloud storage with features similar to Google Drive. Implemented allocated storage control for users, display of remaining space in a clear interface, and file management capabilities: move, copy, rename, delete, and view details. Includes an admin system for managing users and storage. The project demonstrates skills in complex web application development, server-side logic handling, frontend-backend integration, and managing large amounts of data. Fully developed by me, including Docker setup and both frontend and backend development.",
                },
            ],

            certs: "Certificates",
            certs_list: [
                {
                    name: "Web & Mobile Application Developer Diploma",
                    file: "./cert/Carlos/diplomeDev.png",
                    desc: "Issued for completing a comprehensive course in full-cycle web development — including frontend (HTML, CSS, JavaScript, UI/UX) and backend (PHP, Python, databases) — as well as mobile app creation using Progressive Web Apps (PWA) technology.",
                },
                {
                    name: "Cisco CCNA 4: CyberOps Associate",
                    file: "./cert/Cisco/CCNA4.png",
                    desc: "Confirms successful completion of the Cisco CyberOps Associate course focused on cybersecurity operations and Security Operations Center (SOC) practices. Covered network monitoring, threat and incident analysis, network protocols, and attack detection techniques. Gained hands-on experience in digital forensics, endpoint protection, network traffic analysis, and the use of tools such as Wireshark, SIEM platforms, and incident response technologies.",
                },
                {
                    name: "Cisco CCNA 3: Enterprise Networking, Security and Automation",
                    file: "./cert/Cisco/CCNA3.png",
                    desc: "Confirms successful completion of the third course in the CCNA certification preparation program. Covered enterprise networking technologies, OSPF routing, WAN infrastructure, network security fundamentals, and automation concepts. Gained hands-on experience with securing network devices and traffic, configuring ACLs, VPNs and SSH, as well as modern SDN, virtualization, and network infrastructure automation approaches.",
                },
                {
                    name: "Cisco CCNA 2: Switching, Routing, and Wireless Essentials",
                    file: "./cert/Cisco/CCNA2.png",
                    desc: "Certifies the successful completion of the second course in the CCNA certification training program. Covers key switching, routing, and wireless networking technologies. Includes configuration and management of VLANs, inter-VLAN routing, STP and EtherChannel protocols, setup of Cisco routers and switches, as well as fundamentals of LAN/WLAN design and security.",
                },

                {
                    name: "Cisco CCNA 1: Introduction to Networks",
                    file: "./cert/Cisco/CCNA1.png",
                    desc: "Certifies successful completion of the first of three courses in the CCNA certification pathway. Covers networking fundamentals including network architecture, OSI model, IPv4/IPv6 addressing, routing, Ethernet protocols, and basic device configuration using Cisco CLI.",
                },
                {
                    name: "Cisco IT Essentials: PC Hardware and Software",
                    file: "./cert/Cisco/IT_Essentials.png",
                    desc: "Certifies successful completion of the Cisco IT Essentials course. Covers fundamentals of PC and mobile device hardware and software: internal components, system assembly, OS and application installation, hardware/software troubleshooting and maintenance, printers and mobile devices, basic networking and security, virtualization and cloud computing.",
                },
                {
                    name: "IBM Data Visualization with Python",
                    file: "./cert/IBM/Data Visualization with Python.png",
                    desc: "Confirms successful completion of the IBM Data Visualization with Python course. Covered data visualization and analysis techniques using Python and libraries such as Matplotlib, Seaborn, Plotly, and Folium. Gained hands-on experience in creating interactive charts, dashboards, maps, diagrams, and visual reports, as well as presenting and interpreting data for Data Science and analytics projects.",
                },
                {
                    name: "IBM Python 101 for Data Science",
                    file: "./cert/IBM/Python 101 for Data Science.png",
                    desc: "Confirms successful completion of the IBM Python 101 for Data Science course. Covered Python programming fundamentals, data structures, functions, loops, file handling, and object-oriented programming. Gained hands-on experience with Pandas and NumPy, working in Jupyter Notebook environments, data processing and analysis, as well as basic automation and data preparation techniques for Data Science projects.",
                },
                {
                    name: "UCI Project Initiation and Planning",
                    file: "./cert/Coursera/Inicio y planificación de proyectos.png",
                    desc: "Confirms successful completion of the UCI Project Initiation and Planning course by the University of California, Irvine. Covered project management fundamentals, project planning and goal definition, stakeholder management, scope management, and Work Breakdown Structure (WBS) development. Gained practical knowledge in project documentation, risk evaluation, organizational structures, and effective collaboration within project teams.",
                },
                {
                    name: "Microsoft & UCI Project Management Fundamentals",
                    file: "./cert/Coursera/Project Management Fundamentals.png",
                    desc: "Confirms successful completion of the Project Management Fundamentals course by Microsoft. Covered core project management principles, project lifecycle, task and resource planning, risk management, scheduling, and budgeting. Gained practical knowledge in team collaboration, project tracking, documentation, and the use of modern project management tools and methodologies.",
                },
                {
                    name: "OOP Programmer Certificate",
                    file: "./cert/Carlos/programadorOOP.png",
                    desc: "Covers core concepts of object-oriented programming (OOP), such as encapsulation, inheritance, polymorphism, and abstraction, with practical implementation in high-level languages.",
                },
                {
                    name: "Front-end Developer Certificate",
                    file: "./cert/Carlos/devFrontEnd.png",
                    desc: "Awarded for completing a course in frontend development, focusing on HTML5, CSS3, JavaScript, responsive design, cross-browser compatibility, and UI/UX design principles.",
                },
                {
                    name: "Back-end Developer Certificate",
                    file: "./cert/Carlos/devBackEnd.png",
                    desc: "Confirms proficiency in backend development with PHP and Python, database management, REST API integration, web app architecture, and security practices.",
                },
                {
                    name: "Game Developer Certificate",
                    file: "./cert/Carlos/devGame.png",
                    desc: "Covers fundamentals of game development including game design, programming in Unity, as well as basic marketing and monetization strategies in the gaming industry.",
                },
                {
                    name: "Mobile Developer Certificate",
                    file: "./cert/Carlos/devPhone.png",
                    desc: "Certifies knowledge in mobile development using PWA technology — building cross-platform apps with offline access, installation capabilities, and device integration.",
                },
            ],

            degree: "Degree",
            degree_text: "Final semester at university - almost graduated!\n\nI study at Universidad del Valle de México (UVM), in the program Executive Bachelor’s Degree in Software and Network Engineering.\nI began my studies in May 2023.\n\nDuring the program I completed courses in OOP, algorithms, cybersecurity, networking, computer architecture, and databases.\nI learned programming languages such as C++, C, Java, Python, and SQL.\nI specialized in software development, networking technologies (CCNA I–IV), information security, mobile programming, web services, and data visualization.\nI mastered methodologies like Agile, Scrum, and DevOps, project management, and working with modern IT platforms.\nI also gained experience with certifications from Coursera and Cisco.",
        },

        es: {
            title: "Ingeniero Fullstack y DevOps versátil",
            intro: "¡Hola! Soy Egor Pavlov — un desarrollador de ciclo completo que trabaja en todos los niveles: web, escritorio e infraestructura. Diseño y creo soluciones tecnológicas completas, con enfoque en arquitectura, eficiencia y una presentación cuidada. Ya sea una integración compleja, lógica backend o automatización — transformo ideas en software funcional y sólido.",
            skills: "Habilidades Clave",
            skills_list: ["Desarrollo fullstack (frontend + backend)", "Lenguajes: C++, C#, Python, Java, JavaScript, PHP", "Frameworks y librerías: Django, Vue.js, Node.js, Qt, .NET", "Aplicaciones de escritorio: Qt, WinForms, JavaFX, .NET", "DevOps: Linux, Git, Docker, CI/CD, automatización", "Integraciones CRM/API (Bitrix24, amoCRM, webhooks personalizados)", "Bases de datos: PostgreSQL, MySQL, SQLite, MongoDB", "Trabajo con REST APIs, JSON, XML, WebSocket"],
            projects: "Proyectos",
            project_list: [
                {
                    name: "Plataforma de integración de reservas en línea y control de acceso (SCUD)",
                    role: "Desarrollador líder: backend, frontend, despliegue Docker, integración CRM y control de acceso.",
                    impact: "Unifiqué reservas, pagos, sincronización con Bitrix24 y gestión de acceso a salas en un sistema productivo.",
                    stack: ["Django", "Docker", "Bitrix24", "PHP", "WebSocket"],
                    file: ["./projects/24reson/1.png", "./projects/24reson/2.png", "./projects/24reson/3.png"],
                    desc: "Proyecto comercial para una empresa que combina la reserva en línea de salas de reuniones y tarifas con integración en el sistema de control de acceso (SCUD) y CRM Bitrix24. Desarrollé el backend en Django utilizando Docker, garantizando un despliegue conveniente y gestión del entorno. El sistema incluye registro de usuarios, panel personal, calendario de reservas y sincronización de datos con Bitrix24. Configuré la creación automática de tarjetas de clientes, negocios y productos en el CRM, así como la gestión de acceso a las instalaciones a través del SCUD. Desarrollé un servidor SCUD en PHP puro con intercambio de comandos vía WebSocket y registro de todos los eventos de acceso. El sistema soporta sincronización bidireccional, procesamiento de pagos y gestión dinámica de sucursales, tarifas y salas. Dirigí un equipo de 3 personas, realizando la mayor parte del backend y frontend.",
                },
                {
                    name: "Aplicación PWA para notificaciones a clientes y soporte legal",
                    role: "Responsable backend: arquitectura API, Docker, integración con Bitrix24 y conexión con Telegram bot.",
                    impact: "Creé un panel para clientes con deudas, pagos, notificaciones y contacto directo con soporte legal.",
                    stack: ["Flask", "Docker", "Vue", "Bitrix24", "Telegram API"],
                    file: ["./projects/pwa_site/1.png"],
                    desc: "Proyecto comercial en formato Progressive Web App para la interacción de clientes con el departamento legal de la empresa. Desarrollé un servidor API en Flask (Python) utilizando Docker como pieza central para integrar la aplicación con el CRM Bitrix24 y un bot de Telegram. Los clientes, a través de su panel personal, pueden consultar deudas, recibir notificaciones, pagar servicios y comunicarse directamente con los abogados. Para cada cliente se lleva un caso individual con seguimiento de estado. El frontend fue desarrollado en Vue.js (Vite); me encargué personalmente de la integración con el backend y la lógica de negocio. Trabajé en un equipo de 3 personas, siendo responsable de toda la parte del servidor, configuración de Docker y conexión del backend con el maquetado hecho por otros desarrolladores.",
                },
                {
                    name: "Mod de Minecraft con historia y mecánica de juego única",
                    role: "Programador gameplay: eventos, lógica de NPC, jefes, triggers y progresión.",
                    impact: "Convertí un servidor en una aventura con música dinámica, aliados, enemigos y múltiples finales.",
                    stack: ["Java", "Spigot", "Game Logic", "Events"],
                    file: ["./projects/strangers_in_rosaville/1.png", "./projects/strangers_in_rosaville/2.png", "./projects/strangers_in_rosaville/3.png", "./projects/strangers_in_rosaville/4.png"],
                    desc: "Proyecto en Java Spigot para servidores de Minecraft que convierte el juego en una aventura completa con historia, secretos y eventos dinámicos. Desarrollé un sistema de música de fondo que cambia según la ubicación y los activadores en el mapa. Se crearon NPC amistosos que pueden dialogar, seguir al jugador y ayudar en la aventura, así como NPC enemigos con personalidad única y posibles giros de trama (el enemigo puede convertirse en aliado). Implementé batallas contra jefes, varios finales y mecánicas interactivas, incluyendo herramientas y skins personalizados. El trabajo se realizó en un equipo de 2 personas: me encargué completamente de la programación y código, mientras que otro desarrollador trabajó en skins, diseño e historia. También participé en la creación de contenido y guion. El proyecto demuestra habilidades en desarrollo de sistemas de juego complejos, gestión de eventos e integración de diversas mecánicas.",
                },
                {
                    name: "Almacenamiento en la nube personal (similar a Google Drive)",
                    role: "Desarrollador solo: lógica de producto, backend, frontend, administración y entorno Docker.",
                    impact: "Construí una nube privada funcional con cuotas de almacenamiento y gestión completa de archivos.",
                    stack: ["Django", "Docker", "Bootstrap", "jQuery"],
                    file: ["./projects/fileExchange/1.png", "./projects/fileExchange/2.png", "./projects/fileExchange/3.png"],
                    desc: "Proyecto personal en Django con Docker, Bootstrap y jQuery que funciona como almacenamiento en la nube personal con funcionalidades similares a Google Drive. Implementé control de espacio asignado para usuarios, visualización del espacio restante en una interfaz clara, así como gestión de archivos: mover, copiar, renombrar, eliminar y ver información. Incluye sistema de administración para gestión de usuarios y almacenamiento. El proyecto demuestra habilidades en desarrollo de aplicaciones web complejas, trabajo con lógica de servidor, integración del frontend con el backend y manejo de grandes volúmenes de datos. Fue desarrollado completamente por mí, incluyendo configuración de Docker y desarrollo frontend y backend.",
                },
            ],
            certs: "Certificados",
            certs_list: [
                {
                    name: "Diploma de Desarrollador de Sitios Web y Aplicaciones Móviles",
                    file: "./cert/Carlos/diplomeDev.png",
                    desc: "Certifica la finalización de un curso completo en desarrollo web full-stack — incluyendo frontend (HTML, CSS, JavaScript, UI/UX) y backend (PHP, Python, bases de datos) — y en creación de aplicaciones móviles usando tecnología PWA (Progressive Web Apps).",
                },
                {
                    name: "Cisco CCNA 4: CyberOps Associate",
                    file: "./cert/Cisco/CCNA4.png",
                    desc: "Certifica la finalización exitosa del curso Cisco CyberOps Associate enfocado en operaciones de ciberseguridad y trabajo en un Security Operations Center (SOC). Se estudiaron monitoreo de redes, análisis de amenazas e incidentes, protocolos de red y métodos de detección de ataques. Se adquirieron habilidades en análisis forense digital, protección de endpoints, análisis de tráfico de red y uso de herramientas como Wireshark, SIEM y tecnologías de respuesta a incidentes.",
                },
                {
                    name: "Cisco CCNA 3: Enterprise Networking, Security and Automation",
                    file: "./cert/Cisco/CCNA3.png",
                    desc: "Certifica la finalización exitosa del tercer curso del programa de preparación para la certificación CCNA. Se estudiaron tecnologías de redes empresariales, enrutamiento OSPF, infraestructura WAN, fundamentos de seguridad de red y automatización. Se adquirieron habilidades en protección de dispositivos y tráfico de red, uso de ACL, VPN y SSH, así como conceptos modernos de SDN, virtualización y automatización de infraestructura de red.",
                },
                {
                    name: "Cisco CCNA 2: Conmutación, Enrutamiento y Fundamentos de Redes Inalámbricas",
                    file: "./cert/Cisco/CCNA2.png",
                    desc: "Certifica la finalización exitosa del segundo curso del programa de formación para la certificación CCNA. Se estudiaron las tecnologías clave de conmutación, enrutamiento y redes inalámbricas. Incluye la configuración y administración de VLAN, el enrutamiento inter-VLAN, los protocolos STP y EtherChannel, la configuración de routers y switches Cisco, así como los fundamentos del diseño y la seguridad de redes LAN y WLAN.",
                },
                {
                    name: "Cisco CCNA 1: Introducción a las Redes",
                    file: "./cert/Cisco/CCNA1.png",
                    desc: "Certifica la finalización exitosa del primero de tres cursos en la ruta hacia la certificación CCNA. Cubre los fundamentos de redes, incluyendo la arquitectura de red, el modelo OSI, direccionamiento IPv4/IPv6, enrutamiento, protocolos Ethernet y configuración básica de dispositivos con Cisco CLI.",
                },
                {
                    name: "Cisco IT Essentials: Hardware y Software de PC",
                    file: "./cert/Cisco/IT_Essentials.png",
                    desc: "Certifica la finalización exitosa del curso Cisco IT Essentials. Cubre fundamentos del hardware y software de PC y dispositivos móviles: componentes internos, ensamblaje del sistema, instalación de sistemas operativos y aplicaciones, mantenimiento y solución de problemas de hardware/software, impresoras y dispositivos móviles, redes básicas y seguridad, virtualización y computación en la nube.",
                },
                {
                    name: "IBM Data Visualization with Python",
                    file: "./cert/IBM/Data Visualization with Python.png",
                    desc: "Certifica la finalización exitosa del curso IBM Data Visualization with Python. Se estudiaron técnicas de visualización y análisis de datos utilizando Python y librerías como Matplotlib, Seaborn, Plotly y Folium. Se adquirieron habilidades en la creación de gráficos interactivos, dashboards, mapas, diagramas y reportes visuales, así como métodos de interpretación y presentación de datos para Data Science y analítica.",
                },
                {
                    name: "IBM Python 101 for Data Science",
                    file: "./cert/IBM/Python 101 for Data Science.png",
                    desc: "Certifica la finalización exitosa del curso IBM Python 101 for Data Science. Se estudiaron fundamentos de programación en Python, estructuras de datos, funciones, ciclos, manejo de archivos y programación orientada a objetos. Se adquirieron habilidades en el uso de Pandas y NumPy, trabajo en Jupyter Notebook, procesamiento y análisis de datos, así como métodos básicos de automatización y preparación de datos para Data Science.",
                },
                {
                    name: "UCI Inicio y Planificación de Proyectos",
                    file: "./cert/Coursera/Inicio y planificación de proyectos.png",
                    desc: "Certifica la finalización exitosa del curso UCI Inicio y Planificación de Proyectos de University of California, Irvine. Se estudiaron fundamentos de gestión de proyectos, planificación y definición de objetivos, gestión de stakeholders, administración del alcance y creación de estructuras Work Breakdown Structure (WBS). Se adquirieron habilidades en documentación de proyectos, evaluación de riesgos, estructuras organizacionales y colaboración efectiva dentro de equipos de proyecto.",
                },
                {
                    name: "Microsoft & UCI Project Management Fundamentals",
                    file: "./cert/Coursera/Project Management Fundamentals.png",
                    desc: "Certifica la finalización exitosa del curso Project Management Fundamentals de Microsoft. Se estudiaron principios fundamentales de gestión de proyectos, ciclo de vida del proyecto, planificación de tareas y recursos, gestión de riesgos, tiempos y presupuestos. Se adquirieron habilidades en colaboración de equipos, seguimiento de proyectos, documentación y uso de herramientas modernas de project management.",
                },
                {
                    name: "Certificado de Programador OOP",
                    file: "./cert/Carlos/programadorOOP.png",
                    desc: "Incluye los conceptos clave de la programación orientada a objetos (POO): encapsulamiento, herencia, polimorfismo y abstracción, con implementación práctica en lenguajes de alto nivel.",
                },
                {
                    name: "Certificado de Desarrollador Front-end",
                    file: "./cert/Carlos/devFrontEnd.png",
                    desc: "Otorgado tras completar un curso de desarrollo frontend enfocado en HTML5, CSS3, JavaScript, diseño responsivo, compatibilidad entre navegadores y principios de diseño UI/UX.",
                },
                {
                    name: "Certificado de Desarrollador Back-end",
                    file: "./cert/Carlos/devBackEnd.png",
                    desc: "Certifica conocimientos en desarrollo backend con PHP y Python, manejo de bases de datos, integración de APIs REST, arquitectura de aplicaciones web y seguridad.",
                },
                {
                    name: "Certificado de Desarrollador de Videojuegos",
                    file: "./cert/Carlos/devGame.png",
                    desc: "Incluye fundamentos del desarrollo de videojuegos: diseño, programación en Unity, así como nociones básicas de marketing y monetización en la industria del gaming.",
                },
                {
                    name: "Certificado de Desarrollador Móvil",
                    file: "./cert/Carlos/devPhone.png",
                    desc: "Certifica habilidades en desarrollo móvil usando tecnología PWA — creación de apps multiplataforma con acceso offline, instalación y funciones integradas del dispositivo.",
                },
            ],

            degree: "Título universitario",
            degree_text: "Último semestre universitario - ¡casi graduado!\n\nEstudio en la Universidad del Valle de México (UVM), en el programa Licenciatura Ejecutiva en Ingeniería en Diseño de Software y Redes.\nInicié mis estudios en mayo de 2023.\n\nDurante la carrera cursé asignaturas de POO, algoritmos, ciberseguridad, redes, arquitectura de computadoras y bases de datos.\nAprendí lenguajes como C++, C, Java, Python y SQL.\nMe especialicé en desarrollo de software, tecnologías de redes (CCNA I–IV), seguridad informática, programación móvil, servicios web y visualización de datos.\nDomino metodologías Agile, Scrum y DevOps, gestión de proyectos y el uso de plataformas tecnológicas modernas.\nTambién adquirí experiencia con certificaciones de Coursera y Cisco.",
        },

        ru: {
            title: "Фуллстек разработчик, DevOps-инженер и разработчик десктоп-приложений",
            intro: "Я — Егор Павлов, инженер полного цикла. Мой стек охватывает всё: от фронтенда до серверной логики, от десктопа до DevOps-инфраструктуры. Я разрабатываю не просто интерфейсы или бэкенд — я создаю законченные технологические продукты. Умею решать сложные задачи, интегрировать системы, оптимизировать процессы и доводить всё до блеска. В моём арсенале — опыт, страсть к разработке и внимание к деталям.",
            skills: "Ключевые навыки",
            skills_list: ["Фуллстек-разработка (frontend + backend)", "Языки: C++, C#, Python, Java, JavaScript, PHP", "Фреймворки и библиотеки: Django, Vue.js, Node.js, Qt, .NET", "Десктоп-приложения (Qt, WinForms, JavaFX, .NET)", "DevOps: Linux, Git, Docker, CI/CD, автоматизация процессов", "Интеграции с CRM (Bitrix24, amoCRM), API, вебхуки", "Базы данных: PostgreSQL, MySQL, SQLite, MongoDB", "Работа с REST API, JSON, XML, WebSocket"],
            projects: "Проекты",
            project_list: [
                {
                    name: "Платформа интеграции онлайн-бронирования и СКУД",
                    role: "Ведущий разработчик: backend, frontend, Docker-деплой, CRM и интеграция со СКУД.",
                    impact: "Объединил бронирование, оплату, синхронизацию с Битрикс24 и управление доступом в единую систему.",
                    stack: ["Django", "Docker", "Битрикс24", "PHP", "WebSocket"],
                    file: ["./projects/24reson/1.png", "./projects/24reson/2.png", "./projects/24reson/3.png"],
                    desc: "Коммерческий проект для компании, совмещающий онлайн-бронирование переговорных комнат и тарифов с интеграцией в систему контроля доступа (СКУД) и CRM Битрикс24. Реализовал backend на Django с использованием Docker, обеспечив удобный деплой и управление окружением. Система включает регистрацию пользователей, личный кабинет, календарь бронирований и синхронизацию данных с Битрикс24. Настроил автоматическое создание карточек клиентов, сделок и товаров в CRM, а также управление доступом к помещениям через СКУД. Разработал сервер СКУД на чистом PHP с обменом командами по WebSocket и логированием всех событий доступа. Система поддерживает двустороннюю синхронизацию, обработку платежей и динамическое управление филиалами, тарифами и комнатами. Руководил командой из 3 человек, выполняя основную часть backend и frontend-разработки.",
                },
                {
                    name: "PWA-приложение для уведомлений клиентов и юридической поддержки",
                    role: "Ответственный за backend: архитектура API, Docker, интеграция с Битрикс24 и Telegram-ботом.",
                    impact: "Собрал личный кабинет для клиентов с долгами, оплатой, уведомлениями и связью с юристами.",
                    stack: ["Flask", "Docker", "Vue", "Битрикс24", "Telegram API"],
                    file: ["./projects/pwa_site/1.png"],
                    desc: "Коммерческий проект в формате Progressive Web App для взаимодействия клиентов с юридическим отделом компании. Реализовал API-сервер на Flask (Python) с использованием Docker как центральное звено для интеграции приложения с CRM Битрикс24 и Telegram-ботом. Клиенты через личный кабинет могут просматривать свои задолженности, получать уведомления, оплачивать услуги и связываться с юристами напрямую. Для каждого клиента в системе ведётся индивидуальный кейс с отслеживанием статуса. Frontend разработан на Vue.js (Vite), интеграцию с backend и бизнес-логику выполнил лично. Работал в команде из 3 человек, отвечая за всю серверную часть, Docker-настройку и стыковку backend с версткой, выполненной другими разработчиками.",
                },
                {
                    name: "Сюжетный Minecraft-мод с уникальной игровой механикой",
                    role: "Gameplay-разработчик: события, логика NPC, боссы, триггеры и прогрессия.",
                    impact: "Превратил сервер в сюжетное приключение с динамической музыкой, союзниками, врагами и концовками.",
                    stack: ["Java", "Spigot", "Game Logic", "Events"],
                    file: ["./projects/strangers_in_rosaville/1.png", "./projects/strangers_in_rosaville/2.png", "./projects/strangers_in_rosaville/3.png", "./projects/strangers_in_rosaville/4.png"],
                    desc: "Проект на Java Spigot для серверов Minecraft, превращающий игру в полноценное приключение с сюжетом, секретами и динамическими событиями. Разработал систему фоновой музыки, которая меняется в зависимости от локации и триггеров на карте. Созданы дружественные NPC, которые могут вести диалог, следовать за игроком и помогать в прохождении, а также вражеские NPC с уникальной личностью и возможностью сюжетных поворотов (враг может стать союзником). Реализованы босс-файты, несколько концовок и интерактивные механики, включая кастомные инструменты и скины. Работа велась командой из 2 человек: я полностью отвечал за программирование и код, другой разработчик занимался скинами, дизайном и историей, при этом я также участвовал в создании контента и сюжета. Проект демонстрирует навыки разработки сложных игровых систем, управление событиями и интеграцию различных игровых механик.",
                },

                {
                    name: "Личное облачное хранилище (аналог Google Drive)",
                    role: "Solo-разработчик: продуктовая логика, backend, frontend, админка и Docker-окружение.",
                    impact: "Собрал рабочее приватное облако с квотами хранилища и полным управлением файлами.",
                    stack: ["Django", "Docker", "Bootstrap", "jQuery"],
                    file: ["./projects/fileExchange/1.png", "./projects/fileExchange/2.png", "./projects/fileExchange/3.png"],
                    desc: "Пет-проект на Django с Docker, Bootstrap и jQuery, представляющий собой личное облачное хранилище файлов с функционалом, аналогичным Google Drive. Реализовал контроль выделяемой памяти для пользователей, отображение оставшегося пространства в удобном и наглядном интерфейсе, а также возможности управления файлами: перемещение, копирование, переименование, удаление и просмотр информации о файлах. Предусмотрена система администрирования для управления пользователями и хранилищем. Проект демонстрирует навыки разработки сложных веб-приложений, работу с серверной логикой, интеграцию интерфейса с backend и организацию хранения и обработки больших объёмов данных. Выполнен полностью мной, включая настройку Docker и разработку фронтенда и бэкенда.",
                },
            ],
            certs: "Сертификаты",
            certs_list: [
                {
                    name: "Диплом разработчика веб-сайтов и мобильных приложений",
                    file: "./cert/Carlos/diplomeDev.png",
                    desc: "Подтверждает успешное прохождение курса по созданию веб-сайтов с применением технологий как фронтенд (HTML, CSS, JavaScript, UI/UX), так и бэкенд (PHP, Python, базы данных), а также разработке мобильных приложений с использованием PWA (Progressive Web Apps).",
                },
                {
                    name: "Cisco CCNA 4: CyberOps Associate",
                    file: "./cert/Cisco/CCNA4.png",
                    desc: "Подтверждает успешное завершение курса Cisco CyberOps Associate, посвящённого операциям кибербезопасности и работе Security Operations Center (SOC). Изучены мониторинг сетей, анализ угроз и инцидентов, сетевые протоколы и методы обнаружения атак. Освоены основы цифровой криминалистики, защиты конечных устройств, анализа сетевого трафика, а также использование инструментов Wireshark, SIEM и технологий реагирования на инциденты.",
                },
                {
                    name: "Cisco CCNA 3: Enterprise Networking, Security and Automation",
                    file: "./cert/Cisco/CCNA3.png",
                    desc: "Подтверждает успешное завершение третьего курса программы подготовки к сертификации CCNA. Изучены технологии корпоративных сетей, маршрутизация OSPF, WAN-инфраструктура, основы сетевой безопасности и автоматизации. Освоены методы защиты сетевых устройств и трафика, работа с ACL, VPN и SSH, а также современные подходы к SDN, виртуализации и автоматизации сетевой инфраструктуры.",
                },
                {
                    name: "Cisco CCNA 2: Коммутация, маршрутизация и основы беспроводных сетей",
                    file: "./cert/Cisco/CCNA2.png",
                    desc: "Подтверждает успешное завершение второго курса программы подготовки к сертификации CCNA. Изучены ключевые технологии коммутации, маршрутизации и беспроводных сетей. Освоены конфигурация и управление VLAN, межвлановая маршрутизация, протоколы STP и EtherChannel, настройка маршрутизаторов и коммутаторов Cisco, а также основы проектирования и защиты локальных сетей и WLAN.",
                },
                {
                    name: "Cisco CCNA 1: Введение в сети",
                    file: "./cert/Cisco/CCNA1.png",
                    desc: "Подтверждает успешное завершение первого из трёх курсов программы подготовки к сертификации CCNA. Освоены основы сетевых технологий, включая архитектуру сетей, модель OSI, адресацию IPv4/IPv6, маршрутизацию, протоколы Ethernet и настройку сетевых устройств с использованием Cisco CLI.",
                },
                {
                    name: "Cisco IT Essentials: Аппаратное и программное обеспечение ПК",
                    file: "./cert/Cisco/IT_Essentials.png", // замени путь, если нужно
                    desc: "Подтверждает успешное завершение курса Cisco IT Essentials. Освоены основы работы ПК и мобильных устройств: понимание внутренней архитектуры, сборка, установка ОС и приложений, профилактика и устранение неисправностей аппаратной и программной части, принтеров, мобильных устройств, базовые сетевые и меры безопасности, а также основы виртуализации и облачных технологий.",
                },
                {
                    name: "IBM Data Visualization with Python",
                    file: "./cert/IBM/Data Visualization with Python.png",
                    desc: "Подтверждает успешное завершение курса IBM Data Visualization with Python. Изучены методы визуализации и анализа данных с использованием Python и библиотек Matplotlib, Seaborn, Plotly и Folium. Освоено создание интерактивных графиков, дашбордов, карт, диаграмм и визуальных отчётов, а также методы представления и интерпретации данных для Data Science и аналитики.",
                },
                {
                    name: "IBM Python 101 for Data Science",
                    file: "./cert/IBM/Python 101 for Data Science.png",
                    desc: "Подтверждает успешное завершение курса IBM Python 101 for Data Science. Изучены основы программирования на Python, структуры данных, функции, циклы, работа с файлами и объектно-ориентированное программирование. Освоены библиотеки Pandas и NumPy, работа в Jupyter Notebook, обработка и анализ данных, а также базовые методы автоматизации и подготовки данных для Data Science.",
                },
                {
                    name: "UCI Project Initiation and Planning",
                    file: "./cert/Coursera/Inicio y planificación de proyectos.png",
                    desc: "Подтверждает успешное завершение курса UCI Project Initiation and Planning от University of California, Irvine. Изучены основы управления проектами, планирование и определение целей проекта, работа со stakeholder’ами, управление scope и построение Work Breakdown Structure (WBS). Освоены методы проектной документации, оценки рисков, организационных структур и эффективного взаимодействия внутри проектной команды.",
                },
                {
                    name: "Microsoft & UCI Project Management Fundamentals",
                    file: "./cert/Coursera/Project Management Fundamentals.png",
                    desc: "Подтверждает успешное завершение курса Project Management Fundamentals от Microsoft. Изучены ключевые принципы управления проектами, жизненный цикл проекта, планирование задач и ресурсов, управление рисками, сроками и бюджетом. Освоены методы командного взаимодействия, контроля выполнения проектов, работы с документацией и использования современных инструментов project management.",
                },
                {
                    name: "Программист ООП",
                    file: "./cert/Carlos/programadorOOP.png",
                    desc: "Сертификат, подтверждающий знания и практические навыки объектно-ориентированного программирования (ООП), включая принципы инкапсуляции, наследования, полиморфизма и абстракции, с применением на языках программирования высокого уровня.",
                },
                {
                    name: "Front-end разработчик",
                    file: "./cert/Carlos/devFrontEnd.png",
                    desc: "Сертификат по фронтенд-разработке. Включает углублённое изучение HTML5, CSS3, JavaScript, принципов адаптивной и кроссбраузерной вёрстки, а также основ UI/UX-дизайна и взаимодействия с пользователем.",
                },
                {
                    name: "Back-end разработчик",
                    file: "./cert/Carlos/devBackEnd.png",
                    desc: "Подтверждает освоение основ серверной разработки с использованием PHP и Python, взаимодействия с базами данных, REST API, а также принципов безопасности и архитектуры веб-приложений.",
                },
                {
                    name: "Разработчик игр",
                    file: "./cert/Carlos/devGame.png",
                    desc: "Сертификат по основам геймдева. Изучены принципы проектирования и программирования видеоигр, основы работы с игровыми движками (Unity), а также вводный курс по маркетингу и монетизации игр.",
                },
                {
                    name: "Мобильный разработчик",
                    file: "./cert/Carlos/devPhone.png",
                    desc: "Сертификат, подтверждающий знания в области мобильной разработки на основе PWA — создание кроссплатформенных приложений с оффлайн-доступом, установкой на устройства и интеграцией с функциями смартфона.",
                },
            ],
            degree: "Диплом",
            degree_text: "Последний семестр университета - почти выпустился!\n\nУчусь в Universidad del Valle de México (UVM), степень бакалавра в области инженерии в проектировании программного обеспечения и сетей».\nНачал обучение в мае 2023 года.\n\nЗа время учёбы прошёл дисциплины по ООП, алгоритмам, кибербезопасности, сети, архитектуре компьютеров и базам данных.\nИзучил языки C++, C, Java, Python и SQL.\nУглубился в разработку ПО, сетевые технологии (CCNA I–IV), информационную безопасность, мобильное программирование, веб-сервисы и визуализацию данных.\nОсвоил методологии Agile, Scrum и DevOps, управление проектами и работу с современными IT-платформами.\nТакже получил опыт работы с сертификациями Coursera и Cisco.",
        },
    },
};
