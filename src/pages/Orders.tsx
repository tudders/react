import { useEffect, useState } from 'react';
import useStore from '../store';
import OrdersPageAlert from '../components/OrdersPageAlert';
import { v4 as uuid } from 'uuid';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Orders = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<String | null>(null);

  const fingerprint = useStore(state => state.fingerprint);

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
          `${process.env.REACT_APP_API_DOMAIN}/api/${fingerprint}/orders`,
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
          setData(data => [placeholderData, ...data]);
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
          `${process.env.REACT_APP_API_DOMAIN}/api/${fingerprint}/order/${orderId}`,
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
    const fetchDataForPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_DOMAIN}/api/${fingerprint}/orders`,
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

    fetchDataForPosts();
  });

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
          {error && <div className="text-red-700">{error}</div>}
          {data &&
            data.map((order: any) => (
              <div
                key="orderGUID"
                className="transition relative hover:shadow-lg min-h-32 my-4 bg-white border dark:shadow-slate-700/90 rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 bg-gradient-to-r from-indigo-50 to-yellow-50 dark:bg-gradient-to-r dark:from-slate-800 dark:via-gray-800 dark:to-neutral-900 "
              >
                <div className="absolute top-0 start-0 end-0 h-auto">
                  <div className="p-4 md:p-5">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-neutral-200">
                        {order.orderText}
                      </h3>
                      <div
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
