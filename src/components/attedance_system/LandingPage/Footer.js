export default function Footer() {
  const date = new Date();
  return (
    <div>
      <div>
        
        <main className="bg-red-700 text-white xl:px-4 xl:py-8 py-4 border-t-2 flex flex-col justify-center items-center">
          <div className="p-2 text-center">
            <p className="xl:text-sm text-sm w-full xl:w-3/2 text-nomral mx-auto font-normal">
              Copyright &#169; {date.getFullYear()} All Right Reserved - GPCJ
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
