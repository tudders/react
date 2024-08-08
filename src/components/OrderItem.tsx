// Define the type for the widget prop
import React, { useState } from 'react';
import Cross from '../images/icons/Cross';
import Edit from '../images/icons/Edit';
import Save from '../images/icons/Save';
import Cancel from '../images/icons/Cancel';
import CirclePlus from '../images/icons/CirclePlus';
import SolidStar from '../images/icons/SolidStar';

interface Widget {
  widgetId: number;
  widgetGuid: string;
  orderIdfk: string;
  widgetText: string;
  widgetPriority?: number;
  widgetCreateddatetime: string;
}

// Define the type for the component's props

interface OrderListProps {
  WidgetListProps: Widget[];
  addNewItem: (orderId: Number) => void;
  updateItem: (widget: Widget) => void;
  deleteItem: (itemId: Number, orderId: Number) => void;
  orderId: Number;
}

// Functional component that accepts props of type WidgetListProps
const OrderItem: React.FC<OrderListProps> = ({
  WidgetListProps,
  addNewItem,
  updateItem,
  deleteItem,
  orderId,
}) => {
  const [widgetEdit, setWidgetEdit] = useState<any>(null);
  const [widgetNewVal, setWidgetNewVal] = useState<any>(null);

  // Function to update the widget item
  const updateWidgetItem = (widget: Widget) => {
    // Call the updateItem function to update the widget item
    const newWidget = { ...widget, widgetText: widgetNewVal };
    updateItem(newWidget);
    // Reset the widgetEdit state
    setWidgetEdit(null);
  };

  return (
    <div>
      {WidgetListProps.map(widget => (
        <div
          key={widget.widgetId}
          className="border-2 rounded-md w-full my-3 bg-indigo-50 bg-opacity-60 dark:bg-indigo-900 dark:bg-opacity-25 dark:border-slate-700"
        >
          <div className="flex p-2 justify-between">
            <div className="flex fill-yellow-500 dark:fill-yellow-300">
              <SolidStar />
              {widgetEdit === widget.widgetId ? null : (
                <div className="m-1">{widget.widgetText}</div>
              )}

              {widgetEdit === widget.widgetId ? (
                <input
                  type="text"
                  className="bg-slate-100 dark:bg-slate-600 ms-2"
                  value={widgetNewVal}
                  onChange={e => setWidgetNewVal(e.target.value)}
                />
              ) : null}
            </div>
            {widgetEdit === widget.widgetId && (
              <div className="flex">
                <div
                  onClick={() => {
                    updateWidgetItem(widget);
                  }}
                  className="m-1 p-1 cursor-pointer fill-blue-500 dark:fill-blue-400 hover:scale-125 transform transition duration-250 ease-in-out"
                >
                  <Save />
                </div>
                <div
                  onClick={() => {
                    setWidgetEdit(null);
                  }}
                  className="m-1 p-1 cursor-pointer fill-gray-500 dark:fill-gray-400 hover:scale-125 transform transition duration-250 ease-in-out"
                >
                  <Cancel />
                </div>
              </div>
            )}
            {widgetEdit !== widget.widgetId && (
              <div className="flex">
                <div
                  onClick={() => {
                    setWidgetEdit(widget.widgetId);
                    setWidgetNewVal(widget.widgetText);
                  }}
                  className="m-1 p-1 cursor-pointer fill-blue-500 dark:fill-blue-400 hover:scale-125 transform transition duration-250 ease-in-out"
                >
                  <Edit />
                </div>
                <div
                  className="m-1 p-1 cursor-pointer fill-red-500 dark:fill-red-400 hover:scale-125 transform transition duration-250 ease-in-out"
                  onClick={() => {
                    deleteItem(widget.widgetId, orderId);
                  }}
                >
                  <Cross />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="flex mt-4 " onClick={() => addNewItem(orderId)}>
        <div className="mt-2 pt-1">
          <CirclePlus size={20} />
        </div>
        <span>add widget</span>
      </div>
    </div>
  );
};

export default OrderItem;
