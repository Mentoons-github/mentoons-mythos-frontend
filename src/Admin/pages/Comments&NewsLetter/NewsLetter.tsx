import { Mail, Trash2 } from "lucide-react";
import { formatToRealDate } from "../../../utils/DateFormate";
import {
  deleteNewsletterThunk,
  getNewsletterThunk,
} from "../../../features/about&newsletter/about&newsletterThunk";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { resetAboutNewsletterState } from "../../../features/about&newsletter/about&newsletterSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import DeleteModal from "../../components/modals/deleteModal";
import {
  SearchOptions,
  ShowSort,
  SortButton,
} from "../../components/SortDetails";
import SendMailModal from "../../components/modals/Newsletter/SendMailModal";

const NewsLetter = () => {
  const dispatch = useAppDispatch();
  const {
    newsletters,
    newsletterPage,
    newsletterTotalPages,
    deleteSuccess,
    loading,
    deleteLoading,
    message,
    error,
  } = useAppSelector((state) => state.about_newsletter);

  const [showTable, setShowTable] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showSort, setShowSort] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [mailModal, setMailModal] = useState(false);

  const limit = 10;

  useEffect(() => {
    dispatch(
      getNewsletterThunk({
        page: currentPage,
        limit,
        sort: sortOrder,
        search,
      })
    );
  }, [currentPage, dispatch, search, sortOrder]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success(message);
      dispatch(resetAboutNewsletterState());
    }
    if (error) {
      toast.warning(error);
      dispatch(resetAboutNewsletterState());
    }
  }, [deleteSuccess, dispatch, error, message]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTable(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (newsletterId: string) => {
    setDeleteModal(true);
    setSelectedId(newsletterId);
  };

  return (
    <div className="pt-3 lg:p-4">
      <div className="flex mb-4 h-11 items-center space-x-2 md:space-x-4 justify-between">
        <div className="flex h-full space-x-2 md:space-x-4">
          <SortButton
            onClick={() => setShowSort((prev) => !prev)}
            showSort={showSort}
          />
          <div
            className="md:w-36 h-full px-4 flex items-center justify-between 
                           border  rounded-lg cursor-pointer 
                           shadow-md hover:bg-muted transition-all duration-200"
            onClick={() => setMailModal(true)}
          >
            <div className="flex items-center md:space-x-3">
              <Mail size={22} className="text-blue-800" />
              <h3 className="text-[16px] font-medium hidden md:block">
                Send Mail
              </h3>
            </div>
          </div>
        </div>

        <SearchOptions
          search={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      {showSort && (
        <ShowSort
          sortOrder={sortOrder}
          onClick={(sort) => {
            setSortOrder(sort as "newest" | "oldest");
            setCurrentPage(1);
          }}
        />
      )}

      {!showTable || loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 ">Loading newsletter details...</span>
        </div>
      ) : newsletters.length == 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center ">
          <div className="w-16 h-16 flex items-center justify-center rounded-full  mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold ">No Newsletters found</h2>
          <p className="text-muted-foreground mt-2">
            It looks like there are no newletters.
          </p>
        </div>
      ) : (
        <div className="  h-[calc(94vh-110px)] overflow-y-auto hide-scrollbar will-change-scroll transform-gpu mt-5">
          <div className="inline-block min-w-full">
            <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden ">
              <thead className="bg-blue-800 ">
                <tr className="text-white">
                  <th className="px-4 py-4 text-left">No</th>
                  <th className="px-4 py-4 text-left">Id</th>
                  <th className="px-4 py-4 text-left">Email</th>
                  <th className="px-4 py-4 text-left">Letter Date</th>

                  <th className="px-4 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {newsletters?.map((letter, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 == 0 ? "bg-muted" : ""
                    } border-gray-600`}
                  >
                    <td className="px-4 py-4">{index + 1}</td>
                    <td className="px-4 py-4">{letter?._id}</td>
                    <td className="px-4 py-4 font-semibold">{letter?.email}</td>
                    <td className="px-4 py-4 font-semibold">
                      {formatToRealDate(letter?.createdAt)}
                    </td>

                    <td className="px-4 py-4 space-x-3">
                      <button
                        onClick={() => handleDelete(letter._id as string)}
                        className=" font-semibold text-red-600 rounded-md hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Prev
              </button>

              <span>
                Page {newsletterPage} of {newsletterTotalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => (p < newsletterTotalPages ? p + 1 : p))
                }
                disabled={currentPage === newsletterTotalPages}
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModal && (
        <DeleteModal
          item="Newsletter"
          onClose={() => setDeleteModal(false)}
          onConfirm={() => {
            dispatch(deleteNewsletterThunk(selectedId));
            setDeleteModal(false);
          }}
          loading={deleteLoading}
        />
      )}

      {mailModal && (
        <SendMailModal
          onClose={() => setMailModal(false)}
          emails={newsletters.map((ele) => ele.email)}
        />
      )}
    </div>
  );
};

export default NewsLetter;
