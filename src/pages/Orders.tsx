import { useEffect, useState } from 'react';
import useStore from '../store';
import OrdersPageAlert from '../components/OrdersPageAlert';
import { v4 as uuid } from 'uuid';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { json } from 'stream/consumers';
import { title } from 'process';

const Orders = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<String | null>(null);
  const [titleEdit, setTitleEdit] = useState<any>(null);

  const fingerprint = useStore(state => state.fingerprint);

  function updateTitle(event: any) {
    setTitleEdit({ ...titleEdit, orderText: event.target.value });
  }

  function cancelUpdate(event: any) {
    setTitleEdit(null);
  }

  const saveUpdateOrder = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_DOMAIN}api/${fingerprint}/orders`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(titleEdit),
      },
    );
    if (!response.ok) {
      toast.warning(`HTTP error: Status ${response.status}`, {
        position: 'top-right',
        autoClose: 2000,
        theme: 'light',
      });
      return;
    } else {
      const jsonResponse = await response.json();
      setData(data =>
        data.map(item =>
          item.orderId === jsonResponse.orderId ? jsonResponse : item,
        ),
      );
      setTitleEdit(null);
      toast.success('Record updated', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'light',
      });
    }
  };

  const createNewRecord = () => {
    const newUuid = uuid();

    let placeholderData = {
      orderGUID: newUuid,
      orderText: 'New order',
      orderUserId: fingerprint,
    };

    const postData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_DOMAIN}api/${fingerprint}/orders`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(placeholderData),
          },
        );

        if (!response.ok) {
          toast.warning(`HTTP error: Status ${response.status}`, {
            position: 'top-right',
            autoClose: 2000,
            theme: 'light',
          });
          return;
        } else {
          const jsonResponse = await response.json();
          setData(data => [jsonResponse, ...data]);
          toast.success('Record created', {
            position: 'top-right',
            autoClose: 2000,
            theme: 'light',
          });
        }
      } catch (err) {
        if (err instanceof Error) {
          toast.error(`${err}`, {
            position: 'top-right',
            autoClose: 2000,
            theme: 'light',
          });
        }
      } finally {
      }
    };
    postData();
  };

  const deleteOneRecord = (orderId: Number) => {
    const deleteRecord = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_DOMAIN}api/${fingerprint}/order/${orderId}`,
          {
            method: 'DELETE',
          },
        );
        if (!response.ok) {
          toast.warning(`HTTP error: Status ${response.status}`, {
            position: 'top-right',
            autoClose: 2000,
            theme: 'light',
          });
          return;
        } else {
          setData(data => data.filter(item => item.orderId !== orderId));
          toast.success('Record deleted', {
            position: 'top-right',
            autoClose: 2000,
            theme: 'light',
          });
        }
      } catch (err) {
        if (err instanceof Error) {
          toast.error(`${err}`, {
            position: 'top-right',
            autoClose: 2000,
            theme: 'light',
          });
        }
      }
    };
    deleteRecord();
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_DOMAIN}api/${fingerprint}/orders`,
          {
            method: 'GET',
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let postsData = await response.json();
        setData(postsData);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fingerprint]);

  return (
    <div>
      <OrdersPageAlert />
      <div className="container mx-auto px-2 md:px-0 relative">
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="flex flex-row w-auto ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="50"
            height="50"
            className="mx-2 fill-gray-800 dark:fill-neutral-200 transform -translate-x-2 -translate-y-2 hover:cursor-pointer"
            onClick={createNewRecord}
          >
            <path
              stroke-width="10px"
              d="M 25 2 C 12.264481 2 2 12.264481 2 25 C 2 37.735519 12.264481 48 25 48 C 37.735519 48 48 37.735519 48 25 C 48 12.264481 37.735519 2 25 2 z M 25 4 C 36.664481 4 46 13.335519 46 25 C 46 36.664481 36.664481 46 25 46 C 13.335519 46 4 36.664481 4 25 C 4 13.335519 13.335519 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"
            ></path>
          </svg>
          Add record
        </div>
        <div>
          {loading && (
            <div className="text-xl font-medium">Loading posts...</div>
          )}
          {!loading && !data && (
            <div className="text-xl font-medium">
              No records for this fingerprint
            </div>
          )}
          {error && <div className="text-red-700">{error}</div>}
          {data &&
            data.map((order: any) => (
              <div
                key="orderGUID"
                className="transition relative hover:shadow-lg min-h-36 my-4 bg-white border dark:shadow-slate-700/90 rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 bg-gradient-to-r from-indigo-50 to-yellow-50 dark:bg-gradient-to-r dark:from-slate-800 dark:via-gray-800 dark:to-neutral-900 "
              >
                <div className="absolute top-0 start-0 end-0 h-auto">
                  <div className="p-4 md:p-5">
                    <div className="flex justify-between items-center">
                      <span className="flex">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-neutral-200">
                          {titleEdit?.orderId !== order.orderId && (
                            <span>{order.orderText}</span>
                          )}
                          {titleEdit &&
                            titleEdit?.orderId === order.orderId && (
                              <input
                                value={titleEdit.orderText}
                                onChange={updateTitle}
                              />
                            )}
                        </h3>
                        <span className="flex py-1">
                          {titleEdit?.orderId === order.orderId && (
                            <span
                              className=" h-9 mx-2 px-2 flex flex-row border hover:border-2 cursor-pointer rounded-lg border-blue-500 dark:border-blue-400 px-1 text-blue-500 dark:text-blue-400 fill-blue-500 dark:fill-blue-400"
                              onClick={saveUpdateOrder}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mt-2"
                                style={{
                                  width: '1em',
                                  height: '1em',
                                  verticalAlign: 'middle',
                                  overflow: 'hidden',
                                }}
                                viewBox="0 0 448 512"
                              >
                                <path d="M48 96l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-245.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l245.5 0c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8L320 184c0 13.3-10.7 24-24 24l-192 0c-13.3 0-24-10.7-24-24L80 80 64 80c-8.8 0-16 7.2-16 16zm80-16l0 80 144 0 0-80L128 80zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z" />
                              </svg>
                              <span className="ms-1 mt-1">Save</span>
                            </span>
                          )}
                          {titleEdit?.orderId === order.orderId && (
                            <span
                              className="me-2 px-2 flex flex-row border hover:border-2 cursor-pointer rounded-lg border-gray-500 dark:border-gray-400 px-1 text-gray-500 dark:text-gray-400 fill-gray-500 dark:fill-gray-400"
                              onClick={cancelUpdate}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mt-2"
                                style={{
                                  width: '1em',
                                  height: '1em',
                                  verticalAlign: 'middle',
                                  overflow: 'hidden',
                                }}
                                viewBox="0 0 512 512"
                              >
                                <path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                              </svg>
                              <span className="ms-1 mt-1">Cancel</span>
                            </span>
                          )}
                        </span>
                      </span>
                      <div className="flex py-1">
                        {titleEdit?.orderId !== order.orderId && (
                          <button
                            className="me-2  flex flex-row border hover:border-2 cursor-pointer rounded-lg border-blue-500 dark:border-blue-400 px-1 text-blue-500 dark:text-blue-400 fill-blue-500 dark:fill-blue-400"
                            onClick={() => setTitleEdit(order)}
                          >
                            <span className="p-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{
                                  width: '1em',
                                  height: '1em',
                                  verticalAlign: 'middle',
                                  overflow: 'hidden',
                                }}
                                viewBox="0 0 576 512"
                              >
                                <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
                              </svg>
                            </span>
                            <span className="text-s pt-1 pe-2">Edit</span>
                          </button>
                        )}
                        {titleEdit?.orderId !== order.orderId && (
                          <button
                            className="flex flex-row border hover:border-2 cursor-pointer rounded-lg border-red-500 dark:border-red-400 px-1 text-red-500 dark:text-red-400 fill-red-500 dark:fill-red-400"
                            onClick={() => deleteOneRecord(order.orderId)}
                          >
                            <div className="p-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{
                                  width: '1em',
                                  height: '1em',
                                  verticalAlign: 'middle',
                                  overflow: 'hidden',
                                }}
                                viewBox="0 0 1024 1024"
                              >
                                <path d="M647.744 285.696 512 421.504 376.256 285.696l-90.56 90.56L421.504 512 285.76 647.744l90.496 90.496L512 602.496 647.744 738.24l90.496-90.496L602.496 512 738.24 376.256l-90.496-90.56zm226.304-135.744c-199.936-199.936-524.16-199.936-724.096 0-199.936 199.936-199.936 524.16 0 724.096 199.936 199.936 524.16 199.936 724.096 0 199.936-199.936 199.936-524.16 0-724.096zm-90.496 633.6c-149.952 149.952-393.088 149.952-543.04 0s-149.952-393.088 0-543.04c149.952-149.952 393.088-149.952 543.04 0 149.952 149.952 149.952 393.024 0 543.04z" />
                              </svg>
                            </div>
                            <div className="text-s pt-1 pe-2">Delete</div>
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="mt-1 text-gray-800 dark:text-gray-500">
                      {order.orderGUID}
                    </p>
                    <p className="mt-5 text-xs text-gray-500 dark:text-neutral-400">
                      {order.orderUserId}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Orders;
