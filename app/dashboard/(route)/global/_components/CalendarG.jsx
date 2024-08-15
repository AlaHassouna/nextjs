"use client"
import React from 'react'

 

function CalendarG() {
    return (
      <div className="lg:flex lg:h-full lg:flex-col">
  
  <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
    <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
      <div className="flex justify-center bg-white py-2">
        <span>L</span>
        <span className="sr-only sm:not-sr-only">un</span>
      </div>
      <div className="flex justify-center bg-white py-2">
        <span>M</span>
        <span className="sr-only sm:not-sr-only">ar</span>
      </div>
      <div className="flex justify-center bg-white py-2">
        <span>M</span>
        <span className="sr-only sm:not-sr-only">er</span>
      </div>
      <div className="flex justify-center bg-white py-2">
        <span>J</span>
        <span className="sr-only sm:not-sr-only">eu</span>
      </div>
      <div className="flex justify-center bg-white py-2">
        <span>V</span>
        <span className="sr-only sm:not-sr-only">en</span>
      </div>
      <div className="flex justify-center bg-white py-2">
        <span>S</span>
        <span className="sr-only sm:not-sr-only">am</span>
      </div>
      <div className="flex justify-center bg-white py-2">
        <span>D</span>
        <span className="sr-only sm:not-sr-only">im</span>
      </div>
    </div>
    <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
      <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
       
        <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
         
          <time datetime="2021-12-27">27</time>
        </div>
        <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
          <time datetime="2021-12-28">28</time>
        </div>
        <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
          <time datetime="2021-12-29">29</time>
        </div>
        <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
          <time datetime="2021-12-30">30</time>
        </div>
        <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
          <time datetime="2021-12-31">31</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-01">1</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-01">2</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-03">3</time>
          <ol className="mt-2">
            <li>
              <a href="#" className="group flex">
                <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Reunion </p>
                <time datetime="2022-01-03T10:00" className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">Reunion</time>
              </a>
            </li>
            
          </ol>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-04">4</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-05">5</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-06">6</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-07">7</time>
          <ol className="mt-2">
            <li>
              <a href="#" className="group flex">
                <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Reunion avec Yasser</p>
                <time datetime="2022-01-08T18:00" className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">15:00</time>
              </a>
            </li>
          </ol>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-08">8</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-09">9</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-10">10</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-11">11</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-12" className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">12</time>
          <ol className="mt-2">
            <li>
              <a href="#" className="group flex">
                <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Anniversaire</p>
                <time datetime="2022-01-25T14:00" className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">14:00</time>
              </a>
            </li>
          </ol>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-13">13</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-14">14</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-15">15</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-16">16</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-17">17</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-18">18</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-19">19</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-20">20</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-21">21</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-22">22</time>
          
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-23">23</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-24">24</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-25">25</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-26">26</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-27">27</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-28">28</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-29">29</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-30">30</time>
        </div>
        <div className="relative bg-white px-3 py-2">
          <time datetime="2022-01-31">31</time>
        </div>
        <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
          <time datetime="2022-02-01">1</time>
        </div>
        <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
          <time datetime="2022-02-02">2</time>
        </div>
        <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
          <time datetime="2022-02-03">3</time>
        </div>
        <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
          <time datetime="2022-02-04">4</time>
          
        </div>
        <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
          <time datetime="2022-02-05">5</time>
        </div>
        <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
          <time datetime="2022-02-06">6</time>
        </div>
      </div>
      <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
        
        <button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
          
          <time datetime="2021-12-27" className="ml-auto">27</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
          <time datetime="2021-12-28" className="ml-auto">28</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
          <time datetime="2021-12-29" className="ml-auto">29</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
          <time datetime="2021-12-30" className="ml-auto">30</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
          <time datetime="2021-12-31" className="ml-auto">31</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-01" className="ml-auto">1</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-02" className="ml-auto">2</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-03" className="ml-auto">3</time>
          <span className="sr-only">0 events</span>
          <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
            <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
            <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
          </span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-04" className="ml-auto">4</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-05" className="ml-auto">5</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-06" className="ml-auto">6</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-07" className="ml-auto">7</time>
          <span className="sr-only">1 event</span>
          <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
            <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
          </span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-08" className="ml-auto">8</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-09" className="ml-auto">9</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-10" className="ml-auto">10</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-11" className="ml-auto">11</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 font-semibold text-indigo-600 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-12" className="ml-auto">12</time>
          <span className="sr-only">1 event</span>
          <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
            <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
          </span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-13" className="ml-auto">13</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-14" className="ml-auto">14</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-15" className="ml-auto">15</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-16" className="ml-auto">16</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-17" className="ml-auto">17</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-18" className="ml-auto">18</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-19" className="ml-auto">19</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-20" className="ml-auto">20</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-21" className="ml-auto">21</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 font-semibold text-white hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-22" className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-gray-900">22</time>
          <span className="sr-only">2 events</span>
          <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
            <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
            <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
          </span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-23" className="ml-auto">23</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-24" className="ml-auto">24</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-25" className="ml-auto">25</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-26" className="ml-auto">26</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-27" className="ml-auto">27</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-28" className="ml-auto">28</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-29" className="ml-auto">29</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-30" className="ml-auto">30</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-01-31" className="ml-auto">31</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-02-01" className="ml-auto">1</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-02-02" className="ml-auto">2</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-02-03" className="ml-auto">3</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-02-04" className="ml-auto">4</time>
          <span className="sr-only">1 event</span>
          <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
            <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
          </span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-02-05" className="ml-auto">5</time>
          <span className="sr-only">0 events</span>
        </button>
        <button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
          <time datetime="2022-02-06" className="ml-auto">6</time>
          <span className="sr-only">0 events</span>
        </button>
      </div>
    </div>
  </div>
</div>
    )
}

export default CalendarG