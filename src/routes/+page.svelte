<script lang="ts">
  import SimpleSelect from '$lib/mb-components/simple-select.svelte';
  import ImageSelect from '$lib/mb-components/image-select.svelte';
  import { fmdata } from '../data/data.svelte';
  import type { GroupedOption, InputData, Option } from '$lib/types';
  import { isGrouped } from '$lib/utils';
  import FormInput from '$lib/mb-components/form-input.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Table from '$lib/components/ui/table';

  let qId = 0;
  let submitBtn = $derived(fmdata.form.sections.flatMap(s => s.questions).find(q => q.type === 'input' && q.inputType === 'submit')) as InputData;

  const hasImages = (options: GroupedOption[] | Option[]) => {
    return isGrouped(options) ? options.some(optGrp => optGrp.options.some(opt => opt.image != null)) : options.some(opt => opt.image != null);
  };
</script>

<form class="grid grid-cols-1 p-4 gap-4">
  <div class="grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-4">
    {#each fmdata.form.sections as section}
      {#each section.questions as question}
        {#if question.type === 'select'}
          {#if hasImages(question.options)}
            <ImageSelect id={String(qId++)} {question} />
          {:else}
            <SimpleSelect id={String(qId++)} {question} />
          {/if}
        {:else if question.type === 'input' && question.inputType !== 'submit'}
          <FormInput id={String(qId++)} name={question.name} label={question.label} type={question.inputType} value={question.value} />
        {/if}
      {/each}
    {/each}
  </div>

  {#if Object.getOwnPropertyNames(fmdata.options).length}
    <div class="min-w-[480px]">
      <Table.Root>
        <Table.Caption>Price Details</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head class="w-[100px]">Name</Table.Head>
            <Table.Head>Selection</Table.Head>
            <Table.Head class="text-right">Amount</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each Reflect.ownKeys(fmdata.options) as optId}
            {@const selOpt = fmdata.options[Number(optId)]}
            {#if selOpt}
              <Table.Row>
                <Table.Cell class="font-medium">{selOpt.question.label}</Table.Cell>
                <Table.Cell class="font-medium">{selOpt.option.label}</Table.Cell>
                <Table.Cell class="text-right">￥{selOpt.option.price ?? 0}</Table.Cell>
              </Table.Row>
            {/if}
          {/each}
        </Table.Body>
        {#if Reflect.ownKeys(fmdata.options).length}
          <Table.Footer>
            <Table.Row>
              <Table.Cell colspan={2}>Total</Table.Cell>
              <Table.Cell class="text-right">￥{fmdata.optionsTotal}</Table.Cell>
            </Table.Row>
          </Table.Footer>
        {/if}
      </Table.Root>
    </div>
  {/if}

  {#if submitBtn}
    <Button type="submit" name={submitBtn.name}>{submitBtn.value}</Button>
    <!-- <FormInput id={String(qId++)} name={submitBtn.name} type={submitBtn.inputType} value={submitBtn.value} /> -->
  {/if}
</form>
