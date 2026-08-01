import type { Project } from "../types";
import firstHomePageImage from "../assets/ProjectImages/FirstHomePage/1-HomePage.webp";
import firstHomePageImage2 from "../assets/ProjectImages/FirstHomePage/2-HomePage2.webp";
import firstHomePageImage3 from "../assets/ProjectImages/FirstHomePage/3-AboutMe.webp";
import firstHomePageImage4 from "../assets/ProjectImages/FirstHomePage/4-MyCV.webp";
import firstHomePageImage5 from "../assets/ProjectImages/FirstHomePage/5-Portfolio.webp";
import kloeverlyImage from "../assets/ProjectImages/FirstSemesterProject/Skærmbillede 2026-07-17 165848.webp";
import kloeverlyImage2 from "../assets/ProjectImages/FirstSemesterProject/Skærmbillede 2026-07-17 165859.webp";
import kloeverlyDomainModel from "../assets/ProjectImages/FirstSemesterProject/documentation&Analysis/Domain Model.webp";
import kloeverlyClassDiagram from "../assets/ProjectImages/FirstSemesterProject/documentation&Analysis/Class Diagram.webp";
import kloeverlyActivityDiagram from "../assets/ProjectImages/FirstSemesterProject/documentation&Analysis/Activity Diagram0.webp";
import kloeverlyActivityUc5 from "../assets/ProjectImages/FirstSemesterProject/documentation&Analysis/Activity Diagram (UC-5).webp";
import kloeverlyActivityUc10 from "../assets/ProjectImages/FirstSemesterProject/documentation&Analysis/Activity Diagram (UC-10).webp";
import kloeverlyHappyPath from "../assets/ProjectImages/FirstSemesterProject/documentation&Analysis/A - Happy Path.webp";
import kloeverlyFailurePath from "../assets/ProjectImages/FirstSemesterProject/documentation&Analysis/B - Failure Path.webp";
import lmsImage1 from "../assets/ProjectImages/LMS/lms1.webp";
import lmsImage from "../assets/ProjectImages/LMS/lms2.webp";
import lmsImage3 from "../assets/ProjectImages/LMS/lms3.webp";
import lmsImage4 from "../assets/ProjectImages/LMS/lms4.webp";
import lmsImage5 from "../assets/ProjectImages/LMS/lms5.webp";
import lmsImage6 from "../assets/ProjectImages/LMS/lms6.webp";
import lmsImage7 from "../assets/ProjectImages/LMS/lms7.webp";
import lmsActivityCourseLibrary from "../assets/ProjectImages/LMS/documentation&Analysis/Activity Diagram0 - UC-12 - My Course Library.webp";
import lmsActivityCourseDetails from "../assets/ProjectImages/LMS/documentation&Analysis/Activity Diagram0 - UC-9 - View course details, pre-buy.webp";
import lmsClassDiagram from "../assets/ProjectImages/LMS/documentation&Analysis/ClassDiagramLMS.webp";
import lmsDomainModel from "../assets/ProjectImages/LMS/documentation&Analysis/DomainModel - Final version.webp";
import lmsEerDiagram from "../assets/ProjectImages/LMS/documentation&Analysis/EER - Diagram v2.webp";
import lmsEditProfileSequence from "../assets/ProjectImages/LMS/documentation&Analysis/UC-3-SystemSequenceDiagram-EditProfileInformation.webp";
import lmsCourseDetailsSequence from "../assets/ProjectImages/LMS/documentation&Analysis/UC-9-SystemSequenceDiagram-ViewCourseDetails.webp";
import NECImage from "../assets/ProjectImages/OutsideBlinds/outdoor-blinds1.webp";
import NECImage2 from "../assets/ProjectImages/OutsideBlinds/outdoor-blinds2.webp";
import blindsManualSequence from "../assets/ProjectImages/OutsideBlinds/documentation&Analysis/Sequence Diagram - Manual styring flow (UI-relateret).webp";
import blindsSensorSequence from "../assets/ProjectImages/OutsideBlinds/documentation&Analysis/Sekvensdiagram-Sensordata.webp";
import stockTradingStart from "../assets/ProjectImages/StockTradingGame/1-StartingPage.webp";
import StockTradingGame from "../assets/ProjectImages/StockTradingGame/2-DashboardView1.webp";
import stockTradingDashboard from "../assets/ProjectImages/StockTradingGame/3-DashboardView2.webp";
import stockTradingPortfolio from "../assets/ProjectImages/StockTradingGame/4-PortfolioView.webp";
import stockTradingBuyOne from "../assets/ProjectImages/StockTradingGame/5-BuyStockView1.webp";
import stockTradingBuyTwo from "../assets/ProjectImages/StockTradingGame/6-BuyStockView2.webp";
import stockTradingBuyThree from "../assets/ProjectImages/StockTradingGame/7-BuyStockView3.webp";
import stockTradingSell from "../assets/ProjectImages/StockTradingGame/8-SellStockView1.webp";
import stockTradingBuySequence from "../assets/ProjectImages/StockTradingGame/documentation&Analysis/Buy Stock - SekvensDiagram.webp";
import stockTradingClassDiagram from "../assets/ProjectImages/StockTradingGame/documentation&Analysis/Class Diagram - StockTradingGame.webp";
import stockTradingStateMachine from "../assets/ProjectImages/StockTradingGame/documentation&Analysis/Statemachine Diagram0.webp";

export const projects: Project[] = [
  {
    title: "Learning Management System",
    slug: "LMS-Platform",
    category: "Fullstack Project",
    description: "Study platform with task boards, progress tracking and group collaboration.",
    tags: ["React", "JavaScript", "CSS", "Vite", "Java", "Spring Boot", "JPA", "PostgreSQL", "JSON"],
    accent: "blue",
    image: lmsImage,
    screenshots: [lmsImage, lmsImage1, lmsImage3, lmsImage4, lmsImage5, lmsImage6, lmsImage7],
    detail: {
      displayTitle: "LMS Platform",
      subtitle: "A full-stack Learning Management System for managing courses, assignments and student progress.",
      githubUrl: "https://github.com/MadsDamiri87/TS-SEP2-S26-Projekt",
      timeline: "Jan 2026 - Jun 2026",
      duration: "5 months",
      role: "Full Stack Developer",
      teamSize: "Group project",
      projectScope: [
        {
          title: "Purpose and learning frame",
          paragraphs: [
            "This project was built as a second-semester semester project, so the goal was not to create a polished, production-ready LMS platform, but to design, document, implement, test and present a larger client/server system with a clear connection between process and product.",
          ],
        },
        {
          title: "Process, risk and prioritisation",
          paragraphs: [
            "The project followed Unified Process as the overall frame, with Inception, Elaboration, Construction and Transition used to move from problem field and scope into analysis, design, implementation, testing and final stabilization. Scrum was used inside the construction work through product backlog, sprint backlog, MoSCoW prioritisation, sprint planning, daily check-ins, reviews, retrospectives, acceptance criteria and Definition of Done. That means the project was not only about writing code, but also about learning how to control risk, prioritize an MVP and keep the implementation connected to documented requirements.",
          ],
        },
        {
          title: "Core LearnHub workflows",
          paragraphs: [
            "The system itself is a Learning Management System called LearnHub. It supports different user roles and central course workflows such as user registration/login, course creation, publishing, browsing published courses, viewing course details, simulated purchase/enrollment, a personal course library, course modules, lessons and uploaded learning content. Some features were intentionally treated as future work or out of scope, such as real payment transactions, e-mail systems and full production-level security/legal handling.",
          ],
        },
        {
          title: "Analysis, design and architecture",
          paragraphs: [
            "The analysis and design work included problem formulation, project scope, functional and non-functional requirements, user stories, use case model, use case descriptions, activity diagrams, system sequence diagrams, domain modelling, EER/database design, relational schema, class diagrams, sequence diagrams and UI mockups. The implementation then connected these artifacts to a full-stack technical solution with a React/Vite frontend, Java/Spring Boot backend, REST controllers, DTOs, mappers, service layer, repository layer, JPA/Hibernate entities and PostgreSQL database. A major architectural focus was the use of a three-layer structure, where the frontend/presentation layer handled user workflows and interaction, the backend business layer handled application rules and coordination through services and DTOs, and the data layer handled persistence through repositories, entities and the database. This made separation of responsibility explicit and helped keep UI behaviour, business decisions and database access from being tangled together.",
          ],
        },
        {
          title: "Testing and validation",
          paragraphs: [
            "Testing was also a major part of the project. The backend contains unit tests and integration tests, including tests of service logic and the interaction between controllers, services, repositories and a PostgreSQL test database. Scenario tests were used to validate important user flows from the user's perspective, such as creating course drafts, publishing courses, editing profile information, viewing course details, purchasing/enrolling and adding content to lessons. Testing strategy also drew on ideas such as TDD, boundary thinking, ZOMBIES, and separating verification of small units from validation of larger user flows. The frontend and user experience were also evaluated through responsiveness testing and Lighthouse/accessibility-oriented checks.",
          ],
        },
        {
          title: "How the project should be read",
          paragraphs: [
            "The project should therefore be read as a broad software engineering project rather than only as an LMS prototype. The most important part is the traceability between requirements, analysis, design, implementation, testing and reflection. The finished system demonstrates the main flows, but the real learning value is in how the group used methods, documentation, architecture, testing and prioritisation to move from an idea to a working, explainable system.",
          ],
        },
      ],
      about: [
        "The LMS Platform was built to support course management, assignments and student progress in one coherent system. The focus was to create a practical school platform with a clear separation between user-facing workflows, backend services and persistent data.",
        "The project gave me room to work with full-stack development from both sides of the application. I worked with React on the frontend, Spring Boot on the backend and PostgreSQL for the relational data model, while keeping the implementation structured around maintainable layers.",
        "A large part of the learning value was in designing the system around real workflows: creating courses, handling assignments, showing progress and keeping the UI responsive enough that the application feels useful rather than just technically complete.",
      ],
      technicalChoices: [
        {
          category: "Architecture & Structure",
          title: "Layered Architecture",
          description: "Controllers, services, repositories and domain models were separated to keep responsibilities clear.",
        },
        {
          category: "Architecture & Structure",
          title: "RESTful API",
          description: "Backend endpoints were structured around clear resources and predictable request/response flows.",
        },
        {
          category: "Architecture & Structure",
          title: "Spring Application Context",
          description: "Spring managed the application wiring so dependencies could be injected instead of manually created.",
        },
        {
          category: "Architecture & Structure",
          title: "Transactions & Unit of Work",
          description: "Database-changing operations were kept within controlled transactional boundaries.",
        },
        {
          category: "Data & Contracts",
          title: "Relational Data Model",
          description: "PostgreSQL was used to model courses, users, assignments and progress with explicit relationships.",
        },
        {
          category: "Data & Contracts",
          title: "DTOs",
          description: "Request and response shapes kept API contracts separate from persistence models.",
        },
        {
          category: "Data & Contracts",
          title: "JPA Repositories",
          description: "Repository abstractions handled persistence access while keeping query logic out of controllers.",
        },
        {
          category: "Code Quality Principles",
          title: "Dependency Injection",
          description: "Services and repositories were wired through dependencies to reduce coupling and improve testability.",
        },
        {
          category: "Code Quality Principles",
          title: "SOLID Principles",
          description: "Responsibilities were split across focused classes instead of concentrating too much behavior in one place.",
        },
        {
          category: "Code Quality Principles",
          title: "Coupling & Cohesion",
          description: "The project structure was shaped around related responsibilities staying together and unrelated code staying apart.",
        },
        {
          category: "Domain Behavior",
          title: "Frontend State",
          description: "React components were organized around the main user flows to keep the interface understandable.",
        },
      ],
      documentation: [
        {
          title: "System Architecture",
          description: "High-level overview of frontend, backend services and database responsibilities.",
          type: "Architecture",
          image: lmsDomainModel,
        },
        {
          title: "Class Diagram",
          description: "Core domain classes and relationships used throughout the application.",
          type: "UML",
          image: lmsClassDiagram,
        },
        {
          title: "Sequence Diagram",
          description: "Interaction flow for key LMS actions such as course and assignment handling.",
          type: "UML",
          image: lmsCourseDetailsSequence,
        },
        {
          title: "Database Design",
          description: "Entity relationships and database structure for the main LMS data.",
          type: "ERD",
          image: lmsEerDiagram,
        },
        {
          title: "Course Library Activity",
          description: "Activity diagram for the user's course library flow.",
          type: "Activity",
          image: lmsActivityCourseLibrary,
        },
        {
          title: "Course Details Activity",
          description: "Activity diagram for viewing course details before purchase.",
          type: "Activity",
          image: lmsActivityCourseDetails,
        },
        {
          title: "Edit Profile Sequence",
          description: "System sequence diagram for editing profile information.",
          type: "UML",
          image: lmsEditProfileSequence,
        },
      ],
    },
    status: "Featured",
    type: "Web app",
    year: "2026",
    source: "SEM2",
    semester: 2,
  },
  {
    title: "StockTrading Game",
    slug: "StockTrading-Game",
    category: "Desktop Application",
    description: "JavaFX stock trading simulation with portfolio views, buy/sell flows and market state logic.",
    tags: ["Java", "JavaFX", "FXML", "CSS", "JUnit"],
    accent: "violet",
    image: StockTradingGame,
    screenshots: [
      StockTradingGame,
      stockTradingStart,
      stockTradingDashboard,
      stockTradingPortfolio,
      stockTradingBuyOne,
      stockTradingBuyTwo,
      stockTradingBuyThree,
      stockTradingSell,
    ],
    detail: {
      displayTitle: "StockTrading-Game",
      subtitle: "A stock market simulation game focused on trading flows, portfolio state and market logic.",
      githubUrl: "https://github.com/MadsDamiri87/Stock-Trading-Game",
      timeline: "Spring 2026",
      duration: "One semester",
      role: "Java Developer",
      teamSize: "Solo Project",
      projectScope: [
        {
          title: "Simulation used as a learning frame",
          paragraphs: [
            "This project was built for Software Design and Test, and should be understood as a learning-focused simulation rather than a complete trading product. The trading domain was mainly used as a concrete frame for working with maintainable application structure, testability and design patterns.",
          ],
        },
        {
          title: "Layered application structure",
          paragraphs: [
            "The project includes a JavaFX desktop application with buy/sell flows, portfolio handling, transaction history, local PSV-based persistence, stock price simulation, alerts and market state changes. Around those flows, the project explores a three-layer architecture with a clear separation between presentation, business logic and persistence. The presentation layer is responsible for JavaFX views, controllers, view models and user interaction, the business layer contains trading rules, portfolio logic, fee calculation and market behaviour, while the persistence layer handles storage through DAO interfaces and file-based implementations. This separation of responsibility was a central focus of the course, because it makes the code easier to test, change and reason about without mixing UI concerns with domain logic or data access. The application uses an ApplicationContext, ControllerFactory and ViewManager to keep object creation, dependency wiring and navigation more controlled instead of spreading that responsibility across the UI.",
          ],
        },
        {
          title: "Design principles and patterns",
          paragraphs: [
            "A large part of the project is about applying design principles and patterns in practice. The implementation includes MVVM to reduce controller responsibility, DAO interfaces to separate business logic from file storage, Unit of Work to handle commit/rollback-like behavior, Adapter pattern for logging and UI notifications, Observer pattern for stock market updates and listeners, State pattern for stock price behaviour, and Strategy pattern for interchangeable fee calculation. These choices were not added to make the project look bigger, but to practise SOLID principles such as Single Responsibility, Open/Closed, Dependency Inversion and Dependency Injection in a concrete codebase.",
          ],
        },
        {
          title: "Testing strategy",
          paragraphs: [
            "Testing was also a central part of the project. The project includes unit tests, integration tests and scenario-based test documentation. The tests cover important trading behaviour such as buying, selling, invalid quantities, insufficient funds, transaction handling, rollback/commit behaviour and file logger integration. Test design ideas such as boundary value analysis, equivalence partitioning, AAA/FIRST principles, ZOMBIES and scenario testing were used to connect the code to the theory from the course.",
          ],
        },
        {
          title: "What the project is not",
          paragraphs: [
            "The project is therefore not meant to behave like a real trading platform with live markets, users or financial security. Its value is mainly that it shows how a non-trivial Java application can be structured, tested, documented and explained through architecture, patterns and design decisions.",
          ],
        },
      ],
      about: [
        "StockTrading-Game is a desktop simulation where users can follow market movement, manage a portfolio and execute buy and sell actions. The project focus was not only the user interface, but also the underlying state changes that happen when trades affect balance, holdings and portfolio value.",
        "The application was built with JavaFX and FXML, which made it a good exercise in separating view structure from application logic. I used the project to strengthen my understanding of event-driven desktop applications, validation and user flows with clear feedback.",
        "The most important technical challenge was keeping the trading logic understandable and consistent while still making the UI feel interactive. The project became a practical way to connect object-oriented design with a more complete user experience.",
      ],
      technicalChoices: [
        {
          category: "Architecture & Structure",
          title: "3-Layer Architecture",
          description: "The application was structured around presentation, logic and data responsibilities.",
        },
        {
          category: "Architecture & Structure",
          title: "MVVM",
          description: "View models helped keep UI state and presentation behavior separate from the view layout.",
        },
        {
          category: "Architecture & Structure",
          title: "Unit of Work & Transactions",
          description: "Related trading changes were treated as one complete operation to avoid half-applied portfolio updates.",
        },
        {
          category: "Architecture & Structure",
          title: "Application Context Pattern",
          description: "Shared application state and services were coordinated from a central context instead of scattered setup code.",
        },
        {
          category: "Design Patterns",
          slide: 1,
          title: "Strategy Pattern",
          description: "Interchangeable behavior was isolated behind a common shape so logic could vary without changing callers.",
        },
        {
          category: "Design Patterns",
          slide: 1,
          title: "Adapter Pattern",
          description: "Different object shapes and UI-facing models could be translated into the format the application needed.",
        },
        {
          category: "Design Patterns",
          slide: 1,
          title: "State Pattern",
          description: "Changing application modes were represented explicitly instead of being hidden inside scattered conditionals.",
        },
        {
          category: "Design Patterns",
          slide: 2,
          title: "Observer Pattern",
          description: "UI updates could react to changes in state without each component manually polling for updates.",
        },
        {
          category: "Design Patterns",
          slide: 2,
          title: "Singleton Pattern",
          description: "Shared services were controlled where one coordinated instance made the application behavior clearer.",
        },
        {
          category: "Design Patterns",
          slide: 2,
          title: "Transaction Script",
          description: "Specific trading workflows were handled as focused scripts for clear step-by-step application behavior.",
        },
        {
          category: "Data & Contracts",
          title: "DTOs",
          description: "Data passed between layers was shaped explicitly so UI logic did not depend directly on internal models.",
        },
        {
          category: "Data & Contracts",
          title: "Records",
          description: "Immutable value-style data was represented with records where concise data carriers made sense.",
        },
        {
          category: "Data & Contracts",
          title: "DAO",
          description: "Data access concerns were kept behind dedicated objects instead of being mixed into interface logic.",
        },
        {
          category: "Code Quality Principles",
          title: "SOLID Principles",
          description: "Classes were shaped around focused responsibilities and extendable behavior.",
        },
        {
          category: "Code Quality Principles",
          title: "Coupling & Cohesion",
          description: "Related trading behavior was grouped together while dependencies between unrelated parts were reduced.",
        },
        {
          category: "Code Quality Principles",
          title: "Dependency Injection",
          description: "Dependencies were passed into classes where possible to make behavior easier to replace and test.",
        },
        {
          category: "Code Quality Principles",
          title: "Options Pattern",
          description: "Configuration-style values were separated from the logic that consumed them.",
        },
        {
          category: "Domain Behavior",
          title: "State Machine",
          description: "The trading flow used explicit states and transitions to make application behavior predictable.",
        },
        {
          category: "Domain Behavior",
          title: "Trading Rules",
          description: "Buy and sell actions were validated before updating balance, holdings and portfolio value.",
        },
      ],
      documentation: [
        {
          title: "Trade Flow",
          description: "Sequence of user actions and state updates when buying or selling stock.",
          type: "Flow",
          image: stockTradingBuySequence,
        },
        {
          title: "Class Diagram",
          description: "Overview of portfolio, stock, market and controller responsibilities.",
          type: "UML",
          image: stockTradingClassDiagram,
        },
        {
          title: "State Machine",
          description: "State transitions for the trading application flow.",
          type: "State",
          image: stockTradingStateMachine,
        },
      ],
    },
    status: "Featured",
    type: "Desktop app",
    year: "2026",
    source: "SEM2",
    semester: 2,
  },
  {
    title: "Outside-Blinds Control-Application",
    slug: "Outside-Blinds-Control-Application",
    category: "Client-Server",
    description: "Distributed JavaFX system for automatic outdoor blinds using sensor simulation and TCP/UDP communication.",
    tags: ["Java", "JavaFX", "FXML", "CSS", "JUnit"],
    accent: "green",
    image: NECImage,
    screenshots: [NECImage, NECImage2],
    detail: {
      subtitle: "A distributed JavaFX control system for automatic outdoor blinds with sensor simulation.",
      githubUrl: "https://github.com/MadsDamiri87/NEC-Exam--Outside-Blinds",
      timeline: "Spring 2026",
      duration: "Network project",
      role: "Java Developer",
      teamSize: "Group project",
      projectScope: [
        {
          title: "Focused network assignment",
          paragraphs: [
            "This project was built as a focused network and control-system assignment for the NEC course. Compared to some of my other study projects, it is closer to a complete small system because the goal was clearly defined: simulate sensor input, communicate between components and control outside blinds through a JavaFX interface.",
          ],
        },
        {
          title: "Communication, concurrency and safety logic",
          paragraphs: [
            "The project demonstrates a distributed client/server setup using UDP for sensor data and TCP for control updates. It also includes concurrency-related structure, a producer-consumer flow, a blocking queue, service-layer decision logic, manual override rules and safety handling for wind conditions. The point was not just to make blinds move in a UI, but to demonstrate and explain sockets, protocol thinking, communication flow, threading/concurrency and separation between network, service and presentation layers.",
          ],
        },
        {
          title: "Educational but close to end-to-end",
          paragraphs: [
            "The project is still educational rather than production-ready, but the narrower scope made it possible to bring the main flow close to a working end-to-end solution.",
          ],
        },
      ],
      about: [
        "This project explored how a client-server system can control automatic outdoor blinds based on simulated sensor data. The technical focus was communication between components, UI feedback and keeping the system behavior predictable.",
        "The implementation used Java and JavaFX for the user interface, while TCP and UDP communication were used to exchange data between the different parts of the system.",
      ],
      technicalChoices: [
        {
          title: "TCP/UDP Communication",
          description: "Network protocols were used for reliable commands and lightweight sensor updates.",
        },
        {
          title: "Sensor Simulation",
          description: "Simulated input made it possible to test automatic behavior without physical hardware.",
        },
      ],
      documentation: [
        {
          title: "Network Flow",
          description: "Overview of messages between client, server and sensor simulation.",
          type: "Flow",
          image: blindsSensorSequence,
        },
        {
          title: "Manual Control Flow",
          description: "Sequence diagram for UI-driven manual blind control.",
          type: "UML",
          image: blindsManualSequence,
        },
      ],
    },
    status: "Featured",
    type: "Network system",
    year: "2026",
    source: "NEC",
    semester: 2,
  },
  {
    title: "Personal Portfolio Website",
    slug: "Personal-Portfolio-Website",
    category: "Static Website",
    description: "First-semester portfolio website with home, about, CV and portfolio pages built as a static site.",
    tags: ["HTML", "CSS"],
    accent: "blue",
    image: firstHomePageImage,
    screenshots: [firstHomePageImage, firstHomePageImage2, firstHomePageImage3, firstHomePageImage4, firstHomePageImage5],
    detail: {
      subtitle: "A first-semester portfolio site focused on structure, styling and basic web presentation.",
      githubUrl: "https://github.com/MadsDamiri87/-A--Hjemmeside---Til-eksamen",
      timeline: "Fall 2025",
      duration: "First semester",
      role: "Frontend Developer",
      teamSize: "Solo project",
      projectScope: [
        {
          title: "First portfolio and learning goal",
          paragraphs: [
            "This was my first portfolio website and should be seen as a learning project rather than the final version of my personal site. The project was intentionally limited to static frontend work, mainly HTML and CSS, so the focus stayed on structure, styling, layout, responsiveness and accessibility instead of application logic.",
          ],
        },
        {
          title: "HTML, CSS, layout and accessibility",
          paragraphs: [
            "The website includes a home page, about page, CV page and portfolio page. The work focused on semantic HTML, navigation structure, visual hierarchy, CSS styling, the box model, Flexbox, Grid, media queries and responsive layout across screen sizes. Accessibility was also part of the learning goal, including meaningful page structure, alt text, readable contrast, keyboard-friendly navigation, labels/ARIA where relevant and awareness of WCAG-oriented checks such as Lighthouse.",
          ],
        },
        {
          title: "Intentional static-site limitation",
          paragraphs: [
            "A key part of the project is that it was not meant to be a JavaScript application. JavaScript, canvas and similar dynamic/browser-API features were outside the intended scope for this specific portfolio project, even though they were part of the broader web course. That constraint made the project more about understanding the foundation of the web: how content, layout, styling and accessibility work before adding interactivity.",
          ],
        },
        {
          title: "Why the project still matters",
          paragraphs: [
            "The value of the project is therefore not that it is an advanced personal website, but that it documents an early step in learning frontend development and shows how a simple static site can still be structured, responsive and understandable.",
          ],
        },
      ],
      about: [
        "This was my first portfolio website and an early exercise in turning HTML and CSS into a complete multi-page presentation. The focus was structure, layout, navigation and creating a simple visual identity.",
        "Even though the implementation was intentionally simple, it became an important foundation for understanding responsive layout, semantic HTML and how design decisions affect readability.",
      ],
      technicalChoices: [
        {
          title: "Semantic HTML",
          description: "Pages were structured with basic HTML elements and clear content sections.",
        },
        {
          title: "Custom CSS",
          description: "The visual style and layout were built directly with CSS.",
        },
      ],
    },
    status: "Learning lab",
    type: "Website",
    year: "2025",
    source: "WEB",
    semester: 1,
  },
  {
    title: "Kloeverly",
    slug: "Kloeverly",
    category: "Semester Project",
    description: "JavaFX application for managing residents, tasks and local point-based data storage.",
    tags: ["Java", "JavaFX", "FXML"],
    accent: "green",
    image: kloeverlyImage,
    screenshots: [kloeverlyImage, kloeverlyImage2],
    detail: {
      subtitle: "A first-semester JavaFX application for managing residents, tasks and local data.",
      githubUrl: "https://github.com/MadsDamiri87/1SemesterProjekt",
      timeline: "Fall 2025",
      duration: "Semester project",
      role: "Java Developer",
      teamSize: "Group project",
      projectScope: [
        {
          title: "From JavaFX prototype to software project",
          paragraphs: [
            "Kloeverly was created as a first-semester semester project, and the main goal was not simply to build a JavaFX application. JavaFX was the practical form the prototype took, but the deeper purpose was to learn how to approach a software engineering project from problem to documented solution.",
          ],
        },
        {
          title: "Problem field and requirements work",
          paragraphs: [
            "The project started with a real-world-inspired problem field around an ecological village that wanted a better way to register, structure and make visible green activities, community tasks and trade tasks. Before implementation, the group worked with project description, problem formulation, scope, method choice, risk assessment, requirements, user stories, use cases, use case diagram, activity diagrams and a domain model. These artifacts were used to understand the problem and shape the system before moving into design and code.",
          ],
        },
        {
          title: "Design and prototype structure",
          paragraphs: [
            "The design work included a layered, MVC-inspired structure, class diagrams, sequence diagrams and decisions about how data, screens and user flows should connect. The implemented prototype then used Java, JavaFX, FXML, controllers, domain classes, local file storage and a simple navigation structure to support residents, tasks, task categories, points and saving/loading data.",
          ],
        },
        {
          title: "Testing, documentation and reflection",
          paragraphs: [
            "Testing and documentation were also part of the project. The system was evaluated mainly through manual, scenario-based black-box testing of the implemented use cases, including expected flows and alternative flows. The project also included user/installation documentation and reflection on limitations, process and possible future improvements.",
          ],
        },
        {
          title: "How to read the project",
          paragraphs: [
            "Kloeverly should therefore be read as an early but broad software engineering project. It is not a finished management system for a real community, but it shows the first serious attempt at connecting analysis, design, documentation, implementation and testing into one coherent project.",
          ],
        },
      ],
      about: [
        "Kloeverly was built as an early JavaFX application with a focus on basic application structure, user flows and local data handling. The project introduced practical object-oriented programming in a larger context than small exercises.",
        "The application helped me work with screens, controllers, FXML and serialization while learning how to keep data and interface behavior connected in a maintainable way.",
      ],
      technicalChoices: [
        {
          title: "JavaFX / FXML",
          description: "The interface was built with JavaFX screens and FXML view definitions.",
        },
        {
          title: "Serialization",
          description: "Local data was stored and loaded through serialized application state.",
        },
      ],
      documentation: [
        {
          title: "Domain Model",
          description: "Core domain concepts and relationships behind the Kloeverly application.",
          type: "Domain",
          image: kloeverlyDomainModel,
        },
        {
          title: "Class Diagram",
          description: "Classes and responsibilities used across screens, controllers and data.",
          type: "UML",
          image: kloeverlyClassDiagram,
        },
        {
          title: "Activity Diagram",
          description: "Overall activity flow for the main resident and task handling.",
          type: "Activity",
          image: kloeverlyActivityDiagram,
        },
        {
          title: "Activity Diagram (UC-5)",
          description: "Activity flow for the use case behind managing residents.",
          type: "Activity",
          image: kloeverlyActivityUc5,
        },
        {
          title: "Activity Diagram (UC-10)",
          description: "Activity flow for the use case behind handling tasks.",
          type: "Activity",
          image: kloeverlyActivityUc10,
        },
        {
          title: "Happy Path",
          description: "Successful end-to-end flow through the main application scenario.",
          type: "Flow",
          image: kloeverlyHappyPath,
        },
        {
          title: "Failure Path",
          description: "Alternative flow showing how the application handles a failing scenario.",
          type: "Flow",
          image: kloeverlyFailurePath,
        },
      ],
    },
    status: "Learning lab",
    type: "Desktop app",
    year: "2025",
    source: "SEP1",
    semester: 1,
  },
];

export const skills = [
  "React",
  "TypeScript",
  "SQL",
  "NoSQL",
  "Testing",
  "Architecture",
  "Node.js",
  "Spring Boot",
  "UX thinking",
];
