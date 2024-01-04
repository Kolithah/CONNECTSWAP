import { useState, useEffect, useRef } from "react";
import { fetchPosts } from "../../api";
import { useQuery } from "@tanstack/react-query";
import Card from "./card/card";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { categories,districts,universities, faculties } from "../../constants";
import BeatLoader from "react-spinners/BeatLoader";
const index = () => {
  const { isLoading, data, isError, error, refetch } = useQuery(
    ["posts"],
    () => {
      return fetchPosts();
    }
  );
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1060px)",
  });

  const pathChanged = useMediaQuery({
    query: "(min-width: 1312px)",
  });

  const [currentItems, setCurrentItems] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [setModal, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(0);
  const pageRef = useRef(null);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const modalOpen = (x) => {
    setModalData(x);
    setModalOpen(true);
    console.log(x);
  };

  useEffect(() => {
    const filtered = [modalData];
    if (filtered.length != 0) {
      if (filtered[0]?.governUniversity) {
        setForm({
          prof: filtered[0]?.profession,
          category: "University Student",
          govern: "Government",
          workPlace:
            faculties[filtered[0]?.faculty] +
            "-" +
            universities[filtered[0].university - 1].value,
          targets: filtered[0]?.target.map((e) => {
              return districts[e - 1].value;
            })?.join(),
          places: filtered[0]?.targetUniversities
            .map((e) => {
              return universities[e - 1].value;
            })
            .join(),
        });
      } else {
        setForm({
          prof: filtered[0]?.profession,
          category: getCategory(filtered[0]?.category),
          govern: filtered[0]?.stateOrPrivate == 1 ? "Government" : "Private",
          workPlace: filtered[0]?.workPlace,
          targets: filtered[0]?.target?.map((e) => {
              return districts[e - 1]?.value;
            })?.join(),
          places: filtered[0]?.targetPlaces?.join(),
        });
      }
      setVisible(true);
    }
  }, [modalData]);
  const [form, setForm] = useState({
    prof: "",
    category: "",
    govern: "",
    workPlace: "",
    targets: "",
    places: "",
  });
  const [schemeVisible, setVisible] = useState(false);
  useEffect(() => {
    if (currentCategory == 0) {
      setCurrentData(data);
    } else {
      const filteredData = data.filter(
        (item) => item.category == currentCategory
      );
      console.log(filteredData);
      setCurrentData(filteredData);
    }
  }, [currentCategory, data]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    if (!isLoading) {
      console.log(data);
      setCurrentItems(currentData.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(currentData.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, currentData]);

  useEffect(() => {
    if (!pathChanged) {
      setItemsPerPage(8);
    } else {
      setItemsPerPage(9);
    }
  }, [pathChanged]);
  const getCategory = (e) => {
    try {
      return categories[e - 1][1];
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageClick = (event) => {
    pageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });

    const newOffset = (event.selected * itemsPerPage) % currentData.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const handleSelect = (e) => {
    setCurrentCategory(e.target.value);
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="opacity-0">d</div>
      <div className=" md:mt-24 mt-20 z-0">
        <div className="md:text-8xl text-5xl flex flex-row-reverse w-full">
          <motion.div  initial={{ opacity: 0 , x: -400 }} animate={{ opacity: 1 , x: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="mr-5 mb-5 font-semibold font-poppins">
            Br<span className="text-primary">ow</span>se
          </motion.div>
        </div>
        <div className="hidden absolute right-0 left-0  z-[10000] bg-base-100 backdrop-saturate-125  bg-white/30 top-0 bottom-0 w-full overscroll-contain">
          <div className="h-full  w-1/2 bg-base-200 rounded-sm sideDrawer overscroll-none"></div>
        </div>
        {/* Modal */}
        <div
          className={` ${
            setModal ? "" : "hidden transition-opacity duration-300"
          } fixed top-0 left-0 right-0 bottom-0 bg-white/30 z-[1000] overscroll-contain  backdrop-saturate-125  `}
        >
          <div className="absolute sidebar top-[30%] left-0 right-0 bottom-0 bg-base-100 z-[1001] w-full ">
            <div className="flex flex-row-reverse w-full">
              <div>
                <div
                  className="font-semibold text-2xl mr-3 mt-3 text-primary-content pl-2 pr-2 bg-primary cursor-pointer"
                  onClick={() => setModalOpen(false)}
                >
                  X
                </div>
                
              </div>
            </div>
            <div className="h-full w-full overflow-auto grid grid-cols-2">
              <div className="md:col-span-1 col-span-2 w-full p-5">
                <div className="text-xl"><span className="text-primary font-semibold">Title:</span>{modalData?.title}</div>
                <div className="text-xl"><span className="text-primary font-semibold">Description:</span>{modalData?.postBody}</div>
              </div>
              <div className="md:col-span-1 col-span-2 w-full ">
              {schemeVisible ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-5  mt-3 font-poppins"
                  >
                    <div>
                      <span className="text-primary font-semibold">
                        Post Owner:&nbsp;
                      </span>
                      {modalData?.owner?.name}
                    </div>
                    <div>
                      <span className="text-primary font-semibold">
                        Profession:&nbsp;
                      </span>
                      {form.prof}
                    </div>
                    <div>
                      <span className="text-primary font-semibold">
                        Category:&nbsp;
                      </span>
                      {form.category}
                    </div>
                    <div>
                      <span className="text-primary font-semibold">
                        Government/Private:&nbsp;
                      </span>
                      {form.govern}
                    </div>
                    <div>
                      <span className="text-primary font-semibold">
                        Working place/Institute:&nbsp;
                      </span>
                      {form.workPlace}
                    </div>
                    <div>
                      <span className="text-primary font-semibold">
                        Targeted districts:&nbsp;
                      </span>
                      {form.targets}
                    </div>
                    <div>
                      <span className="text-primary font-semibold">
                        Targeted places:&nbsp;
                      </span>
                      {form.places}
                    </div>
                  </motion.div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>

        <main className="relative min-h-screen overflow-hidden bg-neutral rounded-2xl">
          <div className="flex items-start justify-between">
            <div
              className={`relative hidden  ${
                pathChanged ? "h-[92.5rem]" : "h-[119.5rem]"
              } my-4 ml-4 shadow-lg md:block w-80`}
            >
              <div className="h-full rounded-2xl bg-base-200">
                <div className="flex items-center text-lg text-primary font-semibold  justify-center pt-6">
                  Categories
                </div>
                <div className="mt-6">
                  <ul className="menu w-full p-2 rounded-box bg-base-200">
                    <li key={0} onClick={() => setCurrentCategory(0)}>
                      <a className={currentCategory === 0 ? "active" : ""}>
                        All
                      </a>
                    </li>
                    {categories.map((category) => {
                      return (
                        <li
                          key={category[0]}
                          onClick={() => setCurrentCategory(category[0])}
                        >
                          <a
                            className={
                              currentCategory === category[0] ? "active" : ""
                            }
                          >
                          
                            {category[1]}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
              <header className="z-0 items-center w-full md:h-20 h-32  shadow-lg bg-base-200 rounded-2xl">
                <div className="relative z-0 flex flex-col justify-center h-full px-3 mx-auto flex-center">
                  <div
                    className="relative  p-3 flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0"
                    ref={pageRef}
                  >
                    <div className="container relative left-0 z-0 flex w-3/4 h-auto">
                      <div className="relative flex items-center w-full h-full lg:w-64 group">
                        <select
                          className={`select select-sm select-bordered w-full max-w-xs ${
                            isDesktopOrLaptop ? "hidden" : ""
                          }`} 
                          onChange={handleSelect}
                        >
                          <option defaultValue key={0} value={0}>All</option>
      
                          {categories.map((category) => {
                            return (
                              <option key={category[0]} value={category[0]}>
                                {category[1]}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-end w-1/4 p-1 ml-5 mr-4 sm:mr-0 sm:right-auto">
                    
                    </div>
                    <div> </div>
                  </div>
                </div>
              </header>
              <motion.div layout className="flex flex-wrap  justify-center">
                {isLoading ? (
                  <div className="flex items-center justify-center w-full align-middle h-32"><BeatLoader color="hsl(var(--pf))" size={20} /></div>
                ) : isError ? (
                  <div>Error</div>
                ) : (
                  currentItems.map((e) => {
                    return (
                      <Card
                        key={e._id}
                        cardData={e}
                        cardRefetch={refetch}
                        modalClick={modalOpen}
                        className="basis-1/4"
                      />
                    );
                  })
                )}
              </motion.div>
              <div className="bg-base-200 rounded-2xl ">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="< previous"
                  renderOnZeroPageCount={null}
                  containerClassName="Browse-pagination"
                  disabledLinkClassName="Browse-page-disabled"
                  pageLinkClassName="Browse-page-link"
                  previousLinkClassName="Browse-page-link"
                  nextLinkClassName="Browse-page-link"
                  breakLinkClassName=""
                  activeLinkClassName="Browse-page-active"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default index;
