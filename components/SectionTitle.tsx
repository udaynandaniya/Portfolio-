import React from "react";

type Props = {
  icon: React.ElementType;
  title: string;
};

// export default function SectionTitle({ icon: Icon, title }: Props) {
//   return (
//     <div className="flex items-center gap-3 mb-8 sm:mb-10 group">

//       <div
//         className="relative flex items-center justify-center w-11 h-11 rounded-xl
// bg-gradient-to-br from-orange-100 to-orange-50
// dark:from-orange-900/50 dark:to-orange-800/30
// ring-1 ring-orange-300/70 dark:ring-orange-700/60
// shadow-[0_4px_14px_rgba(249,115,22,0.25)]
// transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(249,115,22,0.45)]"
//       >
//         <Icon className="text-orange-500" size={20} />
//       </div>

//       {/* Title */}
//       <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white tracking-wide">
//         {title}
//       </h3>
//     </div>
//   );
// }


export default function SectionTitle({ icon: Icon, title }: Props) {
  return (
    <div className="mb-10">

      {/* Heading Row */}
      <div className="group flex items-center gap-4">


        <div
          className="relative flex items-center justify-center w-11 h-11 rounded-xl
          bg-gradient-to-br from-orange-100 to-orange-50
          dark:from-orange-900/50 dark:to-orange-800/30
          ring-1 ring-orange-300/70 dark:ring-orange-700/60
          shadow-[0_4px_14px_rgba(249,115,22,0.25)]
          transition-all duration-300
          group-hover:scale-110
          group-hover:shadow-[0_6px_24px_rgba(249,115,22,0.5)]"
        >
          <Icon className="text-orange-500" size={20} />
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white tracking-wide transition-colors duration-300 group-hover:text-orange-500">
          {title} :
        </h3>
      </div>

    </div>
  );
}
