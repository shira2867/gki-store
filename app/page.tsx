import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 style={{ fontSize: '50px', fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '20px' }}>Welcome to the Store</h1>
      <img src="/logo2.jpg" alt="GKI Store Logo" width={400} height={400} style={{ display: 'block', margin: '0 auto' }} />
    </div>
  );
}
