# MovieMint

<h2>Overview</h2>

This application is a full-featured web-based platform developed using modern web technologies to simplify the process of booking movie tickets online.

The platform provides an impressive and responsive user interface, ensuring a seamless experience across both desktop and mobile devices. Users can create accounts, manage their bookings, and receive real-time updates on seat availability. The system also includes features like seat selection with dynamic layouts, booking history, and digital ticket generation.

On the administrative side, the application supports role-based access for admins and theater owners, enabling them to manage movies, schedules, screens, and seat configurations efficiently. Real-time data handling ensures accurate seat reservation and prevents double bookings.

Overall, this project demonstrates the integration of frontend and backend technologies to build a scalable, user-friendly, and efficient ticket booking solution.

<h2> App Features</h2>

<h4>User Features</h4>

* <strong>Browser Movies</strong>
<br>
 Users can explore a list of currently running and upcoming movies with detailed information such as genre, duration, cast, and release date.

* <strong>View Show Timings</strong>
<br>
Displays available showtimes across different theaters, allowing users to choose a convenient schedule.

* <strong>Interactive Seat Selection</strong>
<br>
Provides a dynamic seat layout where users can visually select available seats. Real-time updates ensure accurate seat availability.

* <strong>Digital Ticket Generation</strong>
<br>
Generates downloadable tickets (PDF or digital format) that can be used for entry or sharing.

* <strong>Booking History Management</strong>
<br>
Users can view past and upcoming bookings, making it easy to track their movie plans.

<h4>Theater Owner Features</h4>

* <strong>Movie Selection</strong>
<br>
Theater owners can select movies from the movie list which is created by admins instead of creating new ones, ensuring consistency across the platform.

* <strong>Show & Schedule Management</strong>
<br>
Allows theater owners to create multiple showtimes for each movie across different and dates, providing flexibility in scheduling.

* <strong>Custom Pricing per movie</strong>
<br>
Enables setting different ticket prices for each movie and showtime

* <strong>Screen & Seat Layout Configuration</strong>
<br>
Theater owners can design and manage seat layouts. Enabling dynamic seat selection.

* <strong>Booking & Revenue Tracking</strong>
<br>
Provides access to booking details and earnings, helping theater owners monitor performance and occupancy.

<h2>System & Architecture Features</h2>

* <strong>Microservice Architecture</strong>
<br>
The application is designed using a microservices-based architecture, where core functionalities (such as authentication, booking, notifications, and media handling) are separated into independent services. This improves scalability, maintainability, and allows independent deployment of each service.

* <strong>Multi-Container Deployment with Docker</strong>
<br>
The system uses Docker for containerization, with each service running in its own container. This ensures consistency across development and production environments, simplifies deployment, and enables easy scaling of individual services.

* <strong>Background Task Processing</strong>
<br>
Supports asynchronous background jobs for handling non-blocking operations such as sending notifications and processing system events efficiently.

* <strong>Real-Time Communication (WebSockets)</strong>
<br>
Implements WebSocket-based communication to enable real-time updates for seat availability, ensuring users see instant changes when seats are selected or booked by others.

* <strong>Movie Release Notification System</strong>
<br>
Implements scheduled background tasks to notify users when a movie is released or becomes available for booking, enhancing user engagement.

* <strong>Pagination & Efficient Data Handling</strong>
<br>
Uses pagination to efficiently manage and serve large datasets like movies, bookings for improving performance and reducing load times.

* <strong>Multiple Frontend Applications</strong>
<br>
The platform includes separate frontend applications for:

    - App – for browsing and booking tickets 
    <br>
    - Admin Dashboard – for managing movie catalog <br>
    - Theater Dashboard – for managing shows and pricing 
    <br>
This separation ensures better user experience and role-based access control.

* <strong>Independently Scalable Frontend & Services</strong>
<br>
Both frontend applications and backend services can be scaled independently based on traffic and usage, making the system highly flexible and efficient.

<h2>Technologies</h2>

`Frontend` - <b>
    React, Next js, Redux, Vite, Typescript, Tailwind CSS, CSS, Sass, Axios, React Router (For React navigation), Zod (For validation), Lucid React (For icons), Shadcn (For components), React Hook Form (For form validation)
</b> 


`Backend` - <b>
    Fastify, Express js, Hono js, Node js, Bun js, Typescript, Sequelize, Mongoose, Bullmq (For background tasks), Zod (For validation), Multer (For multiformdata data), Nodemailer (For mail service)
</b>


`Database` - <b>
    Mongodb, Postgresql, Redis
</b>

`Media & Storage` - <b>
    Supabase (Cloud storage for media)
</b>

`DevOps & Deployment` - <b>
    Docker (Multi-container microservices setup)
</b>

`Development & Automation` - <b>
    Bash script
</b>

`Version Control & Collaboration` - <b>
    Git, Github
</b>