export const metadata = {
  title: 'Blog Summarizer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />

        <style>{`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            min-height: 100vh;
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(-45deg, #488787ff, #6f8989ff, #2c5364, #000000);
            background-size: 400% 400%;
            animation: gradientAnimation 20s ease infinite;
            overflow-x: hidden;
            overflow-y: auto;
            position: relative;
          }

          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .content-box {
           opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s ease-out 0.3s forwards;
            background: rgba(174, 163, 163, 0.1);
            padding: 3rem 4rem;
            margin: 4rem auto;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(84, 67, 67, 0.25);
            max-width: 1000px;
            width: 95%;
            text-align: center;
            white-space: pre-wrap;
            backdrop-filter: blur(12px);
            color: #060606ff;
            z-index: 1;
            position: relative;
            font-size: 1.1rem;
line-height: 1.7;

          }

          .content-box a {
            color: #365565ff;
            font-weight: 500;
            text-decoration: none;
            word-break: break-word;
          }

          .content-box a:hover {
            text-decoration: underline;
          }

          .bubbles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
            pointer-events: none;
          }

          .bubble {
            position: absolute;
            bottom: -150px;
            background: rgba(221, 213, 213, 0.85);
            border-radius: 50%;
            animation: floatBubble 20s linear infinite;
          }

          @keyframes floatBubble {
            0% {
              transform: translateY(0) scale(1);
              opacity: 0;
            }
            50% {
              opacity: 0.6;
            }
            100% {
              transform: translateY(-120vh) scale(1.3);
              opacity: 0;
            }
          }
            @keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

        `}</style>
      </head>
      <body>
        {/* Bubbles container */}
        <div className="bubbles">
          {[...Array(20)].map((_, i) => {
            const size = Math.random() * 80 + 20; // 20px to 100px
            const left = Math.random() * 100; // %
            const delay = Math.random() * 20; // s
            const duration = Math.random() * 10 + 10; // 10s to 20s

            return (
              <div
                key={i}
                className="bubble"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                }}
              />
            );
          })}
        </div>

        {/* Main content */}
        <div className="content-box">
          {children}
        </div>
      </body>
    </html>
  );
}
