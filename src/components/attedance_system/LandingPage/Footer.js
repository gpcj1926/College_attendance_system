export default function Footer() {
  const date = new Date();
  return (
    <div>
      <div>

        <main className="bg-red-800 text-white xl:px-4 py-3 border-t-2 flex flex-col justify-center items-center">
          <div className="p-2 text-center">
            <p className="xl:text-sm text-sm w-full xl:w-3/2 text-nomral mx-auto font-normal">
              Copyright &#169; {date.getFullYear()} All Right Reserved - GPGCJ
              <h2 className="mt-2 hover:underline text-gray-300 hover:text-white"><a href="https://www.linkedin.com/in/kashif12702/">Contact Developer</a></h2>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
