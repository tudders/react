function OrdersPageAlert() {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 dark:bg-neutral-800 dark:border-neutral-700"
      role="alert"
      tabIndex={-1}
      aria-labelledby="hs-discovery-label"
    >
      <div className="flex">
        <div className="shrink-0">
          <svg
            className="shrink-0 size-4 text-blue-600 mt-1"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx={12} cy={12} r={10} />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </div>
        <div className="ms-3">
          <h3
            id="hs-discovery-label"
            className="text-gray-800 font-semibold dark:text-white"
          >
            The purpose of this page is to show basic CRUD operations on
            hierarchical data
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-neutral-500">
            This holds CRUD operations using a Spring Boot REST API backend and
            hierarchical React components. This can typically be seen in orders,
            blog posts, invertory data, etc. It is fully interactive and
            responsive.
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-neutral-500">
            View the <strong>React</strong> and <strong>SpringBoot</strong> code
            on Github{' '}
            <a href="https://github.com/tudders" target="_blank">
              (link)
            </a>
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-neutral-500">
            Go ahead and create a record using the{' '}
            <span className="underline">add record button</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrdersPageAlert;
