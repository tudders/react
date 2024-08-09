import { useEffect, useState } from 'react';
import useStore from '../store';
import OrdersPageAlert from '../components/OrdersPageAlert';
import OrderItem from '../components/OrderItem';
import { v4 as uuid } from 'uuid';
import CrossIcon from '../images/icons/Cross';
import EditIcon from '../images/icons/Edit';
import SaveIcon from '../images/icons/Save';
import CancelIcon from '../images/icons/Cancel';
import CirclePlus from '../images/icons/CirclePlus';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      orderGuid: newUuid,
      orderText: 'New order',
      orderUserid: fingerprint,
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

  const addNewOrderItem = (orderId: Number) => {
    const newUuid = uuid();

    let placeholderData = {
      widgetGuid: newUuid,
      widgetText: 'New Item',
      orderIdfk: orderId,
    };

    const postData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_DOMAIN}api/${fingerprint}/orders/widget`,
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
            autoClose: 1000,
            theme: 'light',
          });
          return;
        } else {
          const jsonResponse = await response.json();
          console.log(jsonResponse);
          setData(data =>
            data.map(item =>
              item.orderId === orderId
                ? { ...item, widgets: [...item.widgets, jsonResponse] }
                : item,
            ),
          );
          toast.success('Widget created', {
            position: 'top-right',
            autoClose: 1000,
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

  const deleteItem = (widgetId: Number, orderId: Number) => {
    const deleteItem = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_DOMAIN}api/${fingerprint}/order/widget/${widgetId}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response.ok) {
          toast.warning(`HTTP error: Status ${response.status}`, {
            position: 'top-right',
            autoClose: 1000,
            theme: 'light',
          });
          return;
        } else {
          const order = data.filter(order => {
            return order.orderId === orderId;
          });

          const newWidgets = order[0].widgets.filter(
            (w: any) => w.widgetId !== widgetId,
          );

          setData(data =>
            data.map(item =>
              item.orderId === orderId
                ? { ...item, widgets: newWidgets }
                : item,
            ),
          );

          toast.warning('Widget deleted', {
            position: 'top-right',
            autoClose: 1000,
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
        return;
      }
    };
    deleteItem();
  };

  const updateItem = (widget: Object) => {
    const updateItem = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_DOMAIN}api/${fingerprint}/orders/widget`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(widget),
          },
        );

        if (!response.ok) {
          toast.warning(`HTTP error: Status ${response.status}`, {
            position: 'top-right',
            autoClose: 1000,
            theme: 'light',
          });
          return;
        } else {
          const jsonResponse = await response.json();

          console.log(jsonResponse);

          const order = data.filter(order => {
            return order.orderId === jsonResponse.orderIdfk;
          });

          console.log(order);

          const newWidgets = order[0].widgets.map((w: any) =>
            w.widgetId === jsonResponse.widgetId ? jsonResponse : w,
          );

          setData(data =>
            data.map(item =>
              item.orderId === jsonResponse.orderIdfk
                ? { ...item, widgets: newWidgets }
                : item,
            ),
          );

          toast.success('Widget updated', {
            position: 'top-right',
            autoClose: 1000,
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
        return;
      }
    };
    updateItem();
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
        <div className="flex flex-row w-auto " onClick={createNewRecord}>
          <CirclePlus size={50} />
          Add record
        </div>
        <div>
          {loading && (
            <div className="text-xl font-medium animate-pulse">
              Loading posts...
            </div>
          )}
          {!loading && data.length === 0 && (
            <div className="text-xl font-medium">
              No records for this fingerprint
            </div>
          )}
          {error && <div className="text-red-700">{error}</div>}
          {data &&
            data.map((order: any) => (
              <div
                key="orderId"
                className="transition relative hover:shadow-lg min-h-36 my-4 bg-white border dark:shadow-slate-700/90 rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 bg-gradient-to-r from-indigo-50 to-yellow-50 dark:bg-gradient-to-r dark:from-slate-800 dark:via-gray-800 dark:to-neutral-900 "
              >
                <div>
                  <div className="p-4 md:p-5">
                    <div className="flex justify-between items-center">
                      <span className="xs:flex">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-neutral-200">
                          {titleEdit?.orderId !== order.orderId && (
                            <span>{order.orderText}</span>
                          )}
                          {titleEdit &&
                            titleEdit?.orderId === order.orderId && (
                              <input
                                className="bg-slate-100 dark:bg-slate-600"
                                value={titleEdit.orderText}
                                onChange={updateTitle}
                              />
                            )}
                        </h3>
                        <span className="flex py-1">
                          {titleEdit?.orderId === order.orderId && (
                            <span
                              className=" h-9 xs:mx-2 px-2 flex flex-row border outline-0 outline outline-0 hover:outline-2 cursor-pointer rounded-lg border-blue-500 dark:border-blue-400 px-1 text-blue-500 dark:text-blue-400 fill-blue-500 dark:fill-blue-400"
                              onClick={saveUpdateOrder}
                            >
                              <SaveIcon />
                              <span className="ms-1 mt-1">Save</span>
                            </span>
                          )}
                          {titleEdit?.orderId === order.orderId && (
                            <span
                              className="me-2 px-2 flex flex-row border outline-0 outline outline-0 hover:outline-2 cursor-pointer rounded-lg border-gray-500 dark:border-gray-400 px-1 text-gray-500 dark:text-gray-400 fill-gray-500 dark:fill-gray-400"
                              onClick={cancelUpdate}
                            >
                              <CancelIcon />
                              <span className="ms-1 mt-1">Cancel</span>
                            </span>
                          )}
                        </span>
                      </span>
                      <div className="flex py-1">
                        {titleEdit?.orderId !== order.orderId && (
                          <button
                            className="me-2  flex flex-row border outline-0 outline outline-0 hover:outline-2 cursor-pointer rounded-lg border-blue-500 dark:border-blue-400 px-1 text-blue-500 dark:text-blue-400 fill-blue-500 dark:fill-blue-400"
                            onClick={() => setTitleEdit(order)}
                          >
                            <span className="p-2">
                              <EditIcon />
                            </span>
                            <span className="text-s pt-1 pe-2">Edit</span>
                          </button>
                        )}
                        {titleEdit?.orderId !== order.orderId && (
                          <button
                            className="flex flex-row border outline outline-0 hover:outline-2 cursor-pointer rounded-lg border-red-500 dark:border-red-400 px-1 text-red-500 dark:text-red-400 fill-red-500 dark:fill-red-400"
                            onClick={() => deleteOneRecord(order.orderId)}
                          >
                            <div className="p-2">
                              <CrossIcon />
                            </div>
                            <div className="text-s pt-1 pe-2">Delete</div>
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="mb-8 text-gray-800 dark:text-gray-500">
                      {order.orderGuid}
                    </div>
                    <OrderItem
                      WidgetListProps={order.widgets}
                      addNewItem={addNewOrderItem}
                      deleteItem={deleteItem}
                      updateItem={updateItem}
                      orderId={order.orderId}
                    />
                    <p className="mt-2 text-xs text-gray-500 dark:text-neutral-400">
                      {order.orderUserid}
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
