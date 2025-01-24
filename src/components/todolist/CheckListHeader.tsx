import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePicker } from "@/components/common/DatePicker";
// import { Input } from "@/components/ui/input";
import { CreateListModal } from "./CreateListModal";

export function CheckListHeader() {
  return (
    <div className="flex items-center justify-between gap-2">
      <Tabs defaultValue="doing">
        <TabsList>
          <TabsTrigger value="doing">正在进行</TabsTrigger>
          <TabsTrigger value="done">已完成</TabsTrigger>
          <TabsTrigger value="all">全部清单</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="hidden flex-auto justify-end gap-2 md:flex">
        {/* <Input placeholder="搜索清单名称" className="w-[200px]" /> */}
        <DatePicker className="w-[180px]" mode="single" initialFocus />
      </div>

      <div>
        <CreateListModal />
      </div>
    </div>
  );
}
