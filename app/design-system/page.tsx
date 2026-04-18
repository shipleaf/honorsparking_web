"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Modal from "@/app/components/ui/Modal";
import PageHeader from "@/app/components/ui/PageHeader";
import Text from "@/app/components/ui/Text";

export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 flex flex-col gap-16">
      <Text variant="h4" weight="bold">Design System</Text>

      {/* Typography */}
      <section className="flex flex-col gap-4">
        <Text variant="h6" weight="semibold" color="secondary">Typography</Text>
        <div className="flex flex-col gap-2">
          {(["h1","h2","h3","h4","h5","h6","h7","body","sm","xs"] as const).map((v) => (
            <div key={v} className="flex items-baseline gap-4">
              <Text variant="xs" color="disabled" className="w-10 shrink-0">{v}</Text>
              <Text variant={v}>텍스트 샘플 — {v}</Text>
            </div>
          ))}
        </div>
      </section>

      {/* Text Color */}
      <section className="flex flex-col gap-4">
        <Text variant="h6" weight="semibold" color="secondary">Text Color</Text>
        <div className="flex flex-col gap-2">
          <Text variant="body" color="primary">primary — grey-900</Text>
          <Text variant="body" color="secondary">secondary — grey-600</Text>
          <Text variant="body" color="disabled">disabled — grey-400</Text>
          <div className="bg-grey-900 px-3 py-2 rounded-lg w-fit">
            <Text variant="body" color="inverse">inverse — white</Text>
          </div>
        </div>
      </section>

      {/* Text Weight */}
      <section className="flex flex-col gap-4">
        <Text variant="h6" weight="semibold" color="secondary">Font Weight</Text>
        <div className="flex flex-col gap-2">
          {(["regular","medium","semibold","bold"] as const).map((w) => (
            <Text key={w} variant="body" weight={w}>{w} — 주차 관리 서비스</Text>
          ))}
        </div>
      </section>

      {/* Button */}
      <section className="flex flex-col gap-4">
        <Text variant="h6" weight="semibold" color="secondary">Button</Text>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Text variant="sm" color="disabled">variant</Text>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">primary</Button>
              <Button variant="secondary">secondary</Button>
              <Button variant="ghost">ghost</Button>
              <Button variant="text">text</Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Text variant="sm" color="disabled">size</Text>
            <div className="flex flex-wrap items-end gap-3">
              <Button size="lg">large</Button>
              <Button size="md">medium</Button>
              <Button size="sm">small</Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Text variant="sm" color="disabled">state</Text>
            <div className="flex flex-wrap gap-3">
              <Button loading>loading</Button>
              <Button disabled>disabled</Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Text variant="sm" color="disabled">fullWidth</Text>
            <Button fullWidth>full width</Button>
          </div>
        </div>
      </section>

      {/* Input */}
      <section className="flex flex-col gap-4">
        <Text variant="h6" weight="semibold" color="secondary">Input</Text>
        <div className="flex flex-col gap-4">
          <Input variant="filled" label="filled" placeholder="입력하세요" />
          <Input variant="outlined" label="outlined" placeholder="입력하세요" />
          <Input variant="underline" label="underline" placeholder="입력하세요" />
          <Input variant="filled" label="error 상태" placeholder="입력하세요" error="올바른 값을 입력해주세요" />
          <Input variant="filled" label="disabled 상태" placeholder="입력하세요" disabled />
        </div>
      </section>

      {/* Modal */}
      <section className="flex flex-col gap-4">
        <Text variant="h6" weight="semibold" color="secondary">Modal</Text>
        <Button variant="secondary" size="md" onClick={() => setModalOpen(true)}>
          모달 열기
        </Button>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="모달 제목"
        >
          <Text variant="body" color="secondary">
            모달 내용이 여기에 들어갑니다.
          </Text>
          <div className="mt-6 flex gap-2">
            <Button variant="secondary" fullWidth onClick={() => setModalOpen(false)}>
              취소
            </Button>
            <Button fullWidth onClick={() => setModalOpen(false)}>
              확인
            </Button>
          </div>
        </Modal>
      </section>

      {/* PageHeader */}
      <section className="flex flex-col gap-4">
        <Text variant="h6" weight="semibold" color="secondary">PageHeader</Text>
        <div className="border border-grey-200 rounded-xl overflow-hidden flex flex-col gap-2">
          <div className="border-b border-grey-100">
            <PageHeader title="제목만" />
          </div>
          <div className="border-b border-grey-100">
            <PageHeader title="뒤로가기 버튼" backButton onBack={() => {}} />
          </div>
          <div>
            <PageHeader
              title="우측 액션"
              backButton
              onBack={() => {}}
              rightElement={
                <Button variant="text" size="sm">완료</Button>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
