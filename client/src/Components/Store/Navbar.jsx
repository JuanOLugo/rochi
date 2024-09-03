import React from 'react'
import { MdLibraryBooks } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { FaMoneyCheck } from "react-icons/fa6";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { HiBuildingStorefront } from "react-icons/hi2";
function Navbar({store, setSections}) {

    const nav = useNavigate()

    return (
        <div className="flex min-h-screen  flex-col bg-muted/40">
          <aside className=" h-screen inset-y-0 left-0 z-10 flex w-14 flex-col items-center justify-between border-r bg-background py-5 sm:w-16">
            <button
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-red-500 text-lg font-semibold text-primary-foreground md:h-10 md:w-10 md:text-base"
            >
              <HiBuildingStorefront />
              <span className="sr-only">{store.storename}</span>
            </button>
            <nav className="flex flex-col items-center gap-4  ">
            <button onClick={() => setSections({dashboard: true, gastos: false, creditos: false})}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-10 md:w-10"
              >
                <MdLibraryBooks className='text-black' />
                <span className="sr-only">Dashboard</span>
              </button>
              <button onClick={() => setSections({dashboard: false, gastos: true, creditos: false})}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-10 md:w-10"
              >
                <GrMoney />
                <span className="sr-only">Gastos</span>
              </button>
              <button onClick={() => setSections({dashboard: false, gastos: false, creditos: true})}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-10 md:w-10"
              >
                <FaMoneyCheck />
                <span className="sr-only">Credit</span>
              </button>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-10 md:w-10"
                onClick={() => nav("/")}
              >
                <IoArrowBackCircleSharp />
                <span className="sr-only">Back</span>
              </button>
            </nav>
          </aside>
          <div className="flex flex-1 flex-col sm:pl-16" />
        </div>
      )
}

export default Navbar