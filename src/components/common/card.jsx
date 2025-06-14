 <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200 relative">
      {/* Decorative diagonal line */}
      <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-gray-900 transform rotate-45 translate-x-8 -translate-y-8 z-10"></div>

      <div className="flex p-6 gap-6">
        {/* Image and title */}
        <div className="flex flex-col items-center gap-2">
          <img
            src="https://cdn.pixabay.com/photo/2018/01/16/15/07/motorcycle-3083096_1280.png"
            alt="BMW G310 R"
            className="w-36 h-auto object-contain"
          />
          <div className="text-center font-bold text-lg text-gray-800">
            BMW G310 R
            <br />
            <span className="text-sm text-gray-500">(2024)</span>
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 text-gray-800 text-sm">
          <div className="text-base font-semibold mb-4 text-gray-900 border-b pb-2 border-dashed">
            SUMMARY
          </div>

          {/* Date and time */}
          <div className="flex justify-between text-xs mb-4">
            <div className="text-center">
              <div className="font-semibold text-gray-700">08:00 am</div>
              <div className="text-gray-500">31 Dec 2024</div>
            </div>
            <div className="self-center text-gray-500 font-medium">to</div>
            <div className="text-center">
              <div className="font-semibold text-gray-700">08:00 am</div>
              <div className="text-gray-500">01 Jan 2025</div>
            </div>
          </div>

          {/* Address */}
          <div className="text-xs text-gray-600 mb-3 leading-relaxed">
            BTM 2nd Stage (VAKA LIVING PG Basement)
            <br />
            16th Main Rd, Mahadeshwar Nagar,
            <br />
            BTM Layout, Bengaluru, Karnataka
          </div>

          {/* Pricing */}
          <div className="text-xs text-gray-600 mb-3">
            Weekday - 24 hrs × ₹114/hr
          </div>

          {/* Total */}
          <div className="flex justify-between items-center text-sm font-semibold text-gray-800 mb-5 border-t pt-3 border-gray-200">
            <span>Total</span>
            <span>₹2736.00</span>
          </div>

          {/* Helmet selection */}
          <div className="flex justify-between items-center text-xs mb-4">
            <span>Number of Helmets</span>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          {/* Km limit and excess charges */}
          <div className="flex justify-between text-xs text-gray-700">
            <div>
              <span>Kilometer Limit</span>
              <div className="font-semibold text-sm mt-1">192 km</div>
            </div>
            <div>
              <span>Excess Charges</span>
              <div className="font-semibold text-sm mt-1">₹10/km</div>
            </div>
          </div>
        </div>
      </div>
    </div>