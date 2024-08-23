<template>
  <div id="main-box">
    <el-card>
      <el-row>
        <el-col :span="16">
          <div>
            <el-button v-if="buttons.includes('LineData/add')" type="primary" @click="addDataDialog">
              <i class="el-icon-plus" />{{ $t('TablePage.BtnAppend') }}
            </el-button>
            <!-- <el-button v-if="buttons.includes('LineData/delete')" type="danger" @click="deleteData">
              <i class="el-icon-delete" />{{ $t('TablePage.BtnDelete') }}
            </el-button>
            <el-button v-if="buttons.includes('LineData/import')" @click="importDataDialog">
              <i class="el-icon-upload2" />{{ $t('TablePage.BtnImport') }}
            </el-button> -->
            <el-button v-if="buttons.includes('LineData/export')" @click="exportDataDialog">
              <i class="el-icon-download" />{{ $t('TablePage.BtnExport') }}
            </el-button>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="float: right;">
            <el-tooltip class="item" effect="dark" :content="$t('TablePage.BtnRefreshTable')" placement="top">
              <el-button
                size="small"
                icon="el-icon-refresh"
                circle
                @click="refreshTableData"
              />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="$t('TablePage.BtnViewInstruction')" placement="top">
              <el-button
                size="small"
                icon="el-icon-warning-outline"
                circle
                @click="helpTips"
              />
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
      <div class="table-box">
        <el-table
          id="mytable"
          v-loading="loading"
          :data="table_data"
          :header-cell-style="{background:'#eef1f6',color:'#606266', padding: '3px'}"
          :cell-style="{padding: '3px'}"

          stripe
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" :label="lang_dict.name" width="110" sortable fixed />
          <el-table-column prop="enable" :label="lang_dict.enable" width="130">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.enable === true" size="small" type="success">{{ $t('PublicText.Yes') }}</el-tag>
              <el-tag v-else-if="scope.row.enable === false" size="small" type="info">{{ $t('PublicText.No') }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="line_type" :label="lang_dict.line_type" width="110">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.line_type === 1" size="small" type="primary">{{ $t('LineDataPage.NotBPRLine') }}</el-tag>
              <el-tag v-else-if="scope.row.line_type === 2" size="small" type="primary">{{ $t('LineDataPage.IsBPRLine') }}</el-tag>
              <el-tag v-else-if="scope.row.line_type === 3" size="small" type="primary">{{ $t('LineDataPage.SmallBoardLine') }}</el-tag>
              <el-tag v-else size="small" type="info">{{ $t('LineDataPage.UnkonwnLine') }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="line_size_type" :label="lang_dict.line_size_type" width="110">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.line_size_type === 1" size="small" type="primary">{{ $t('LineDataPage.SmallLine') }}</el-tag>
              <el-tag v-else-if="scope.row.line_size_type === 2" size="small" type="primary">{{ $t('LineDataPage.SmallMiddleLine') }}</el-tag>
              <el-tag v-else-if="scope.row.line_size_type === 3" size="small" type="primary">{{ $t('LineDataPage.MiddleLine') }}</el-tag>
              <el-tag v-else-if="scope.row.line_size_type === 4" size="small" type="primary">{{ $t('LineDataPage.MiddleBigLine') }}</el-tag>
              <el-tag v-else-if="scope.row.line_size_type === 5" size="small" type="primary">{{ $t('LineDataPage.BigLine') }}</el-tag>
              <el-tag v-else size="small" type="info">{{ $t('LineDataPage.UnkonwnLine') }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="enable_process_list" :label="lang_dict.enable_process_list" width="400">
            <template slot-scope="scope">
              <el-tag v-for="(val, key) in scope.row.enable_process_list" :key="key" style="margin-right: 5px;">
                {{ val }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="is_AX_line" :label="lang_dict.is_AX_line" width="160">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.is_AX_line === true" size="small" type="success">{{ $t('PublicText.Yes') }}</el-tag>
              <el-tag v-else-if="scope.row.is_AX_line === false" size="small" type="info">{{ $t('PublicText.No') }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="is_Big_line_remove22" :label="lang_dict.is_Big_line_remove22" width="160">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.is_Big_line_remove22 === true" size="small" type="success">{{ $t('PublicText.Yes') }}</el-tag>
              <el-tag v-else-if="scope.row.is_Big_line_remove22 === false" size="small" type="info">{{ $t('PublicText.No') }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="is_Non_big_line" :label="lang_dict.is_Non_big_line" width="160">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.is_Non_big_line === true" size="small" type="success">{{ $t('PublicText.Yes') }}</el-tag>
              <el-tag v-else-if="scope.row.is_Non_big_line === false" size="small" type="info">{{ $t('PublicText.No') }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="is_special_line" :label="lang_dict.is_special_line" width="160">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.is_special_line === true" size="small" type="success">{{ $t('PublicText.Yes') }}</el-tag>
              <el-tag v-else-if="scope.row.is_special_line === false" size="small" type="info">{{ $t('PublicText.No') }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="is_cannot_binding_line" :label="lang_dict.is_cannot_binding_line" width="160">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.is_cannot_binding_line === true" size="small" type="success">{{ $t('PublicText.Yes') }}</el-tag>
              <el-tag v-else-if="scope.row.is_cannot_binding_line === false" size="small" type="info">{{ $t('PublicText.No') }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="min_min_threshold" :label="lang_dict.min_min_threshold" width="110" />
          <el-table-column prop="min_threshold" :label="lang_dict.min_threshold" width="110" />
          <el-table-column prop="max_threshold" :label="lang_dict.max_threshold" width="110" />
          <el-table-column prop="big_able" :label="lang_dict.big_able" width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.big_able === 1" size="small" type="success">✔</el-tag>
              <el-tag v-else-if="scope.row.big_able === 0" size="small" type="info">×</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="middle_able" :label="lang_dict.middle_able" width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.middle_able === 1" size="small" type="success">✔</el-tag>
              <el-tag v-else-if="scope.row.middle_able === 0" size="small" type="info">×</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="small_able" :label="lang_dict.small_able" width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.small_able === 1" size="small" type="success">✔</el-tag>
              <el-tag v-else-if="scope.row.small_able === 0" size="small" type="info">×</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="balance_class" :label="lang_dict.balance_class" width="100" />
          <el-table-column prop="big_setup" :label="lang_dict.big_setup" />
          <el-table-column prop="small_setup" :label="lang_dict.small_setup" />
          <el-table-column prop="setup_program" :label="lang_dict.setup_program" />
          <el-table-column prop="output_order" :label="lang_dict.output_order" sortable width="170" />
          <el-table-column prop="max_process_time" :label="lang_dict.max_process_time" width="170" />
          <el-table-column prop="max_points" :label="lang_dict.max_points" width="170" />
          <el-table-column prop="default_threshould_of_big_small_line" :label="lang_dict.default_threshould_of_big_small_line" width="170" />
          <el-table-column prop="type_of_big_small_line" :label="lang_dict.type_of_big_small_line" width="160" />
          <el-table-column prop="fixed_ct" :label="lang_dict.fixed_ct" width="160" />
          <el-table-column prop="is_open_program" :label="lang_dict.is_open_program" width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.is_open_program === true" size="small" type="success">{{ $t('PublicText.Yes') }}</el-tag>
              <el-tag v-else-if="scope.row.is_open_program === false" size="small" type="info">{{ $t('PublicText.No') }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="110" fixed="right" :label="$t('TablePage.TitleOperate')">
            <template slot-scope="scope">
              <el-button
                v-if="buttons.includes('LineData/modify')"
                type="primary"
                size="mini"
                icon="el-icon-edit"
                circle
                @click="handleModify(scope.$index, scope.row)"
              />
              <el-button
                v-if="buttons.includes('LineData/delete')"
                type="danger"
                size="mini"
                icon="el-icon-delete"
                circle
                @click="handleDelete(scope.$index, scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          :hide-on-single-page="true"
          :page-size="pageSize"
          :current-page="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="total_num"
          style="margin-top: 16px;"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>
    <el-dialog
      v-el-drag-dialog
      :title="dialogTitle"
      :visible.sync="dataDialogVisible"
      width="60%"
      :before-close="handleFormClose"
      @dragDialog="handleDrag"
    >
      <el-card class="card-form" shadow="never">
        <el-form ref="$form" :model="model" label-position="left" size="small">
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.name" prop="name" :label="lang_dict.name">
                <el-input v-model="model.name" :placeholder="$t('Placeholder.Enter')" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.enable" prop="enable" :label="lang_dict.enable">
                <el-switch v-model="model.enable" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.line_type" prop="line_type" :label="lang_dict.line_type">
                <el-select v-model="model.line_type" :placeholder="$t('Placeholder.Select')">
                  <el-option
                    v-for="item in lineTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.line_size_type" prop="line_size_type" :label="lang_dict.line_size_type">
                <el-select v-model="model.line_size_type" :placeholder="$t('Placeholder.Select')">
                  <el-option
                    v-for="item in lineSizeTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.config_class" prop="config_class" :label="lang_dict.config_class">
                <el-input v-model="model.config_class" :placeholder="$t('Placeholder.Enter')" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.program_class" prop="program_class" :label="lang_dict.program_class">
                <el-input v-model="model.program_class" :placeholder="$t('Placeholder.Enter')" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.is_points" prop="is_points" :label="lang_dict.is_points">
                <el-input v-model="model.is_points" :placeholder="$t('Placeholder.Enter')" oninput="this.value=this.value.replace(/[^0-1]/g, '')" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.balance_class" prop="balance_class" :label="lang_dict.balance_class">
                <el-input v-model="model.balance_class" :placeholder="$t('Placeholder.Enter')" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.capacity" prop="capacity" :label="lang_dict.capacity">
                <el-input-number v-model="model.capacity" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.big_able" prop="big_able" :label="lang_dict.big_able">
                <el-input v-model="model.big_able" :placeholder="$t('Placeholder.Enter')" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.middle_able" prop="middle_able" :label="lang_dict.middle_able">
                <el-input v-model="model.middle_able" :placeholder="$t('Placeholder.Enter')" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.small_able" prop="small_able" :label="lang_dict.small_able">
                <el-input v-model="model.small_able" :placeholder="$t('Placeholder.Enter')" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.min_min_threshold" prop="min_min_threshold" :label="lang_dict.min_min_threshold">
                <el-input-number v-model="model.min_min_threshold" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.min_threshold" prop="min_threshold" :label="lang_dict.min_threshold">
                <el-input-number v-model="model.min_threshold" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.max_threshold" prop="max_threshold" :label="lang_dict.max_threshold">
                <el-input-number v-model="model.max_threshold" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.offset_threshold" prop="offset_threshold" :label="lang_dict.offset_threshold">
                <el-input-number v-model="model.offset_threshold" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.is_Big_line_remove22" prop="is_Big_line_remove22" :label="lang_dict.is_Big_line_remove22">
                <el-switch v-model="model.is_Big_line_remove22" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.is_Non_big_line" prop="is_Non_big_line" :label="lang_dict.is_Non_big_line">
                <el-switch v-model="model.is_Non_big_line" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.is_special_line" prop="is_special_line" :label="lang_dict.is_special_line">
                <el-switch v-model="model.is_special_line" style="width: 100%" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.is_AX_line" prop="is_AX_line" :label="lang_dict.is_AX_line">
                <el-switch v-model="model.is_AX_line" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.is_cannot_binding_line" prop="is_cannot_binding_line" :label="lang_dict.is_cannot_binding_line">
                <el-switch v-model="model.is_cannot_binding_line" style="width: 100%" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-form-item :rules="rules.enable_process_list" prop="enable_process_list" :label="lang_dict.enable_process_list">
              <el-col :span="24" :offset="0" :push="0" :pull="0" tag="div">
                <el-checkbox-group v-model="model.enable_process_list">
                  <el-checkbox v-for="process in all_process_list" :key="process.index" :label="process" />
                </el-checkbox-group>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.big_setup" prop="big_setup" :label="lang_dict.big_setup">
                <el-input-number v-model="model.big_setup" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.small_setup" prop="small_setup" :label="lang_dict.small_setup">
                <el-input-number v-model="model.small_setup" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.setup_program" prop="setup_program" :label="lang_dict.setup_program">
                <el-input-number v-model="model.setup_program" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.output_order" prop="output_order" :label="lang_dict.output_order">
                <el-input v-model="model.output_order" :placeholder="$t('Placeholder.Enter')" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.max_process_time" prop="max_process_time" :label="lang_dict.max_process_time">
                <el-input-number v-model="model.max_process_time" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.max_points" prop="max_points" :label="lang_dict.max_points">
                <el-input-number v-model="model.max_points" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.default_threshould_of_big_small_line" prop="default_threshould_of_big_small_line" :label="lang_dict.default_threshould_of_big_small_line">
                <el-input-number v-model="model.default_threshould_of_big_small_line" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.type_of_big_small_line" prop="type_of_big_small_line" :label="lang_dict.type_of_big_small_line">
                <el-input v-model="model.type_of_big_small_line" :placeholder="$t('Placeholder.Enter')" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="start" align="top" tag="div">
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.fixed_ct" prop="fixed_ct" :label="lang_dict.fixed_ct">
                <el-input-number v-model="model.fixed_ct" :placeholder="$t('Placeholder.Enter')" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0" :push="0" :pull="0" tag="div">
              <el-form-item :rules="rules.is_open_program" prop="is_open_program" :label="lang_dict.is_open_program">
                <el-switch v-model="model.is_open_program" style="width: 100%" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFormClose">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button v-if="dialogBtnType === true" type="primary" @click="addData">{{ $t('TablePage.BtnAppend') }}</el-button>
        <el-button v-else-if="dialogBtnType === false" type="primary" @click="modifyData">{{ $t('TablePage.BtnModify') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('TablePage.TitleFormDescription')"
      :visible.sync="helpDialogVisible"
      width="60%"
      @dragDialog="handleDrag"
    >
      <span>{{ $t('TablePage.MsgIllustrate') }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="helpDialogVisible = false">{{ $t('PublicBtn.Close') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('TablePage.TitleImportData')"
      :visible.sync="importDialogVisible"
      width="60%"
      :before-close="handleImportClose"
      @dragDialog="handleDrag"
    >
      <el-row>
        <el-col :span="8">
          <el-radio-group v-model="importMode" style="margin-top: 26px;">
            <el-radio label="append">{{ $t('TablePage.BtnAppendData') }}</el-radio>
            <el-radio label="replace">{{ $t('TablePage.BtnReplaceData') }}</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="16">
          <div style="display: flex;margin-top: 16px;margin-bottom: 16px;">
            <el-upload
              ref="upload"
              name="file"
              class="upload-demo"
              accept=".xlsx"
              action=""
              :on-change="handleChange"
              :auto-upload="false"
              :show-file-list="true"
              :file-list="uploadFileList"
            >
              <el-button slot="trigger" type="primary" style="margin-left: 10px;">
                <i class="el-icon-upload" />
                {{ $t('TablePage.BtnUploadFile') }}
              </el-button>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleImportClose">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button type="primary" @click="confirmImport">{{ $t('TablePage.BtnConfirmImport') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      :title="$t('TablePage.TitleExportData')"
      :visible.sync="exportDialogVisible"
      :before-close="handleExportClose"
      width="45%"
      @dragDialog="handleDrag"
    >
      <el-row>
        <span>{{ $t('PublicBtn.ConfirmModify') }}</span>
        <el-radio-group v-model="exportRadio">
          <el-radio label="xlsx">.xlsx</el-radio>
        </el-radio-group>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleExportClose">{{ $t('PublicBtn.Close') }}</el-button>
        <el-button type="primary" @click="exportData">{{ $t('TablePage.BtnConfirmExport') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import XLSX from 'xlsx'
import { mapGetters } from 'vuex'
// import { Loading } from 'element-ui'
import elDragDialog from '@/directive/el-drag-dialog'
import { GetTableData, AddData, ModifyData, DeleteData, HandleDelete, ExportData, ImportData, GetLangDict } from '@/api/LongConfig/LineData'
import { GetLineProcess } from '@/api/common'
import { isEqual } from '@/utils/common'
import { deepClone } from '@/utils'
export default {
  name: 'LineData',
  directives: { elDragDialog },
  data() {
    return {
      lang_dict: {}, // 从后端获取表格列名
      loading: true, // 表格加载动画
      importLoading: {
        text: this.$t('PublicText.ImportLoadiing'),
        background: 'rgba(0, 0, 0, 0.5)'
      }, // 导入动画
      loadingInstance: null,
      table_data: [], // 表格数据
      dialogTitle: '', // 表单dialog标题
      dataDialogVisible: false, // 表单dialog显示
      dialogBtnType: true, // 表单dialog按钮 true为添加按钮 false为保存按钮
      helpDialogVisible: false, // 帮助提示dialog
      scopeIndex: '', // 表格行数index
      scopeRow: '', // 表格行数据
      importDialogVisible: false, // 导入数据dialog
      exportDialogVisible: false, // 导出dialog
      importType: false, // false为替换数据 true为添加数据
      uploadFileName: '', // 上传的文件名
      uploadFileList: [], // 上传的文件列表
      uploadFile: null, // 上传的文件
      importMode: 'append', // 导入方式选择:追加或替换（方便以后扩展）
      exportRadio: 'xlsx', // 导出格式选择（方便以后扩展）
      isClick: false, // 是否点击了保存或者提交
      all_process_list: ['B', 'T', 'S'],
      // 表单相关数据
      forms: ['$form'],
      model: {
        id: null,
        name: null,
        is_points: null,
        capacity: undefined,
        config_class: null,
        program_class: null,
        balance_class: null,
        big_able: null,
        middle_able: null,
        small_able: null,
        min_threshold: undefined,
        max_threshold: undefined,
        offset_threshold: undefined,
        is_burn_in: undefined,
        enable_process_list: [],
        line_type: undefined,
        is_AX_line: false,
        is_Big_line_remove22: false,
        is_Non_big_line: false,
        is_special_line: false,
        is_cannot_binding_line: false,
        big_setup: undefined,
        small_setup: undefined,
        setup_program: undefined,
        output_order: null,
        onehot_code: null,
        max_process_time: undefined,
        max_points: undefined,
        line_size_type: undefined,
        enable: false,
        min_min_threshold: undefined,
        type_of_big_small_line: null,
        default_threshould_of_big_small_line: undefined,
        fixed_ct: undefined,
        is_open_program: false
      },
      // 修改前的表单内容，用于对比表单前后的变化（应用：关闭前提示修改未保存）
      modelOriginal: {
        id: null,
        name: null,
        is_points: null,
        capacity: undefined,
        config_class: null,
        program_class: null,
        balance_class: null,
        big_able: null,
        middle_able: null,
        small_able: null,
        min_threshold: undefined,
        max_threshold: undefined,
        offset_threshold: undefined,
        is_burn_in: undefined,
        enable: false,
        enable_process_list: [],
        line_type: undefined,
        is_AX_line: false,
        is_Big_line_remove22: false,
        is_Non_big_line: false,
        is_special_line: false,
        is_cannot_binding_line: false,
        big_setup: undefined,
        small_setup: undefined,
        setup_program: undefined,
        output_order: null,
        onehot_code: null,
        max_process_time: undefined,
        max_points: undefined,
        line_size_type: undefined,
        min_min_threshold: undefined,
        type_of_big_small_line: null,
        default_threshould_of_big_small_line: undefined,
        fixed_ct: undefined,
        is_open_program: false
      },
      modelBackup: {},
      rules: {
        name: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        is_points: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        capacity: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        config_class: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        program_class: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        balance_class: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        big_able: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        middle_able: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        small_able: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        min_threshold: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        max_threshold: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        offset_threshold: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        is_burn_in: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        enable_process_list: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        line_type: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        is_AX_line: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        is_Big_line_remove22: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        is_Non_big_line: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        is_special_line: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        is_cannot_binding_line: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        is_big_small_line: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        big_setup: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        small_setup: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        setup_program: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        output_order: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        max_points: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        max_process_time: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        line_size_type: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        enable: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }],
        min_min_threshold: [{
          required: true,
          message: this.$t('Form.NotNull'),
          trigger: 'blur'
        }]
      },
      // 分页相关
      total_num: 0, // 总共有多少条数据(后端返回)
      currentPage: 1, // 当前在第几页
      pageSize: 30, // 每页多少条数据
      dataTableSelections: [], // 表格选中的数据
      lineTypeOptions: [
        { label: this.$t('LineDataPage.NotBPRLine'), value: 1 },
        { label: this.$t('LineDataPage.IsBPRLine'), value: 2 },
        { label: this.$t('LineDataPage.SmallBoardLine'), value: 3 },
        { label: this.$t('LineDataPage.UnkonwnLine'), value: 0 }
      ],
      lineSizeTypeOptions: [
        { label: this.$t('LineDataPage.SmallLine'), value: 1 },
        { label: this.$t('LineDataPage.SmallMiddleLine'), value: 2 },
        { label: this.$t('LineDataPage.MiddleLine'), value: 3 },
        { label: this.$t('LineDataPage.MiddleBigLine'), value: 4 },
        { label: this.$t('LineDataPage.BigLine'), value: 5 },
        { label: this.$t('LineDataPage.UnkonwnLine'), value: 0 }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'buttons'
    ])
  },
  created() {
    GetLangDict().then(res => {
      this.lang_dict = res.lang_dict
    })
    this.getLineProcess()
    this.getTableData(this.currentPage, this.pageSize)
  },
  mounted() {
    // this.getTableData(this.currentPage, this.pageSize)
    this.modelBackup = deepClone(this.model)
  },
  methods: {
    // dialog可拖拽
    handleDrag() {
      // this.$refs.select.blur()
    },
    // 分页
    handlePageChange(val) {
      this.currentPage = val
      this.getTableData(val, this.pageSize) // 翻页
    },
    getLineProcess() {
      GetLineProcess().then(res => {
        this.all_process_list = res.all_process_list
      })
    },
    // 分页展示表格数据
    getTableData(currentPage, pageSize) {
      this.loading = true
      const data = { 'current_page': currentPage, 'page_size': pageSize }
      GetTableData(data).then(res => {
        if (res.code === 20000) {
          this.table_data = res.table_data
          this.total_num = res.total_num
          this.loading = false
        }
      })
    },
    // 刷新表格数据
    refreshTableData(isAddData = false) {
      if (isAddData) { // 如果是导入/添加/点击刷新按钮，刷新时返回第一页
        this.currentPage = 1
        this.getTableData(1, this.pageSize)
      } else { // 否则只刷新当前页
        this.getTableData(this.currentPage, this.pageSize)
      }
    },
    // 添加数据
    addDataDialog() {
      this.dialogTitle = this.$t('TablePage.TitleAppendData')
      this.dialogBtnType = true
      this.dataDialogVisible = true
      this.isClick = false
    },
    // 添加数据
    addData() {
      this.isClick = true
      const data = this.model
      data['user_name'] = this.name
      this.$refs['$form'].validate((valid) => {
        if (valid) {
          AddData(data).then(res => {
            if (res.code === 20000) {
              this.$notify({
                title: this.$t('PublicText.TitleTip'),
                message: this.$t('TablePage.MsgAppendSuccess'),
                type: 'success'
              })
              this.$alert(this.$t('LineDataPage.MsgAppendData'), this.$t('PublicText.TitleTip'), {
                confirmButtonText: this.$t('PublicBtn.Confirm'),
                type: 'success'
              })
              this.model = deepClone(this.modelBackup)
              this.modelOriginal = deepClone(this.modelBackup)
              this.refreshTableData(true)
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: this.$t('TablePage.MsgAppendError')
          })
        }
      })
    },
    // 获取表格勾选数据
    handleSelectionChange(val) {
      this.dataTableSelections = val
    },
    // 删除所有表格勾选的数据
    deleteData() {
      const dataLength = this.dataTableSelections.length
      if (dataLength === 0) {
        this.$message({
          type: 'warning',
          message: this.$t('TablePage.MsgSelectWarn')
        })
        return
      }
      const idList = []
      for (let i = 0; i < dataLength; i++) {
        idList.push(this.dataTableSelections[i].id)
      }
      this.$confirm(this.$t('TablePage.MsgDeleteMultiDataWarn1') + dataLength + this.$t('TablePage.MsgDeleteMultiDataWarn2'), this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('TablePage.BtnConfirmDelete'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        const data = { 'id_list': idList, 'user_name': this.name }
        DeleteData(data).then(res => {
          if (res.code === 20000) {
            this.$notify({
              title: this.$t('PublicText.TitleTip'),
              message: this.$t('TablePage.MsgDeleteMultiDataWarn3') + dataLength + this.$t('TablePage.MsgDeleteMultiDataWarn4'),
              type: 'success'
            })
            this.refreshTableData() // 刷新表格数据
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    },
    // 修改数据
    handleModify(index, row) {
      // 修改dialog
      this.dialogTitle = this.$t('TablePage.TitleModifyData')
      this.dialogBtnType = false
      this.scopeIndex = index
      this.scopeRow = row
      // 显示表单数据
      // 显示表单数据
      for (const key in this.model) {
        this.model[key] = row[key]
      }
      // 保存原来的表单数据，用于对比变化
      for (const key in this.modelOriginal) {
        this.modelOriginal[key] = this.model[key]
      }
      // 显示dialog
      this.dataDialogVisible = true
      this.isClick = false
    },
    // 编辑数据发送到后端保存
    modifyData() {
      if (!this.checkFormChange()) {
        this.$message({
          type: 'info',
          message: this.$t('TablePage.MsgModifyInfo')
        })
        return
      }
      this.isClick = true
      const data = this.model
      data['user_name'] = this.name
      this.$refs['$form'].validate((valid) => {
        if (valid) {
          ModifyData(data).then(res => {
            if (res.code === 20000) {
              this.$notify({
                title: res.message,
                message: this.$t('TablePage.MsgModifySuccess'),
                type: 'success'
              })
              this.refreshTableData()
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: this.$t('TablePage.MsgAppendError')
          })
        }
      })
    },
    // 检测表单数据是否发生变化，用于提示
    checkFormChange() {
      return !isEqual(this.model, this.modelOriginal)
    },
    // 表单dialog关闭前提示
    handleFormClose() {
      if (this.checkFormChange() && !this.isClick) {
        this.$confirm(this.$t('TablePage.MsgModifyCloseWarn'), this.$t('PublicText.TitleTip'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          cancelButtonText: this.$t('PublicBtn.Cancel'),
          type: 'warning'
        }).then(() => {
          this.closeFormDialog()
        }).catch(() => {

        })
      } else {
        this.closeFormDialog()
      }
    },
    // 关闭表单dialog的一些操作
    closeFormDialog() {
      this.dataDialogVisible = false
      this.model = deepClone(this.modelBackup)
      this.modelOriginal = deepClone(this.modelBackup)
      this.$refs['$form'].clearValidate() // 清除表单验证的文字提示信息
    },
    // 表格中删除数据
    handleDelete(index, row) {
      this.$confirm(this.$t('TablePage.MsgDeleteWarn'), this.$t('PublicText.TitleTip'), {
        confirmButtonText: this.$t('TablePage.BtnConfirmDelete'),
        cancelButtonText: this.$t('PublicBtn.Cancel'),
        confirmButtonClass: 'btnDanger',
        type: 'warning'
      }).then(() => {
        const data = {}
        data['id'] = row.id
        data['name'] = row.name
        data['user_name'] = this.name
        HandleDelete(data).then(res => {
          if (res.code === 20000) {
            this.$notify({
              title: this.$t('PublicText.TitleTip'),
              message: this.$t('TablePage.MsgDeleteSuccess'),
              type: 'success'
            })
            this.refreshTableData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('PublicText.TextCancel')
        })
      })
    },
    // Excel导入到数据库
    importDataDialog() {
      this.importDialogVisible = true
    },
    // 确认导入
    confirmImport() {
      if (this.importMode === 'replace') {
        this.$confirm(this.$t('TablePage.MsgImportReplace'), this.$t('PublicText.TitleTip'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          cancelButtonText: this.$t('PublicBtn.Cancel'),
          confirmButtonClass: 'btnDanger',
          type: 'warning'
        }).then(() => {
          this.importData()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('PublicBtn.MsgUnimport')
          })
        })
      } else {
        this.importData()
      }
    },
    // 导入数据
    importData() {
      // this.loadingInstance = Loading.service(this.importLoading)
      const form = new FormData()
      form.append('file', this.uploadFile)
      form.append('file_name', this.uploadFileName)
      form.append('user_name', this.name)
      form.append('import_mode', this.importMode)
      ImportData(form).then(res => {
        if (res.code === 20000) {
          this.$alert(this.$t('TablePage.MsgExportData1') + res.data_count + this.$t('TablePage.MsgExportData2'), res.message, {
            confirmButtonText: this.$t('PublicBtn.Confirm'),
            type: 'success'
          })
          // this.loadingInstance.close() // 清除动画
          // 1秒后自动关闭窗口
          setTimeout(() => {
            this.handleImportClose()
          }, 1000)
          this.refreshTableData(true)
        }
      }).catch(err => {
        this.loadingInstance.close() // 清除动画
        this.$alert(err, this.$t('PublicText.TextError'), {
          confirmButtonText: this.$t('PublicBtn.Confirm'),
          type: 'error'
        })
      })
    },
    // 导入数据窗口关闭
    handleImportClose() {
      this.importDialogVisible = false
      // 清理已上传文件
      this.$refs.upload.clearFiles()
      this.uploadFileName = ''
      this.uploadFile = null
    },
    // 获取上传文件
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.uploadFileList = [fileList[fileList.length - 1]] // 选择最后一次选择文件
        this.uploadFileName = this.uploadFileList[0].name // 更新文件名
        this.uploadFile = this.uploadFileList[0].raw // 更新文件
      }
    },
    // 数据库导出到Excel
    exportDataDialog() {
      this.exportDialogVisible = true
    },
    // 确认导出
    exportData() {
      ExportData().then(res => {
        if (res.code === 20000) {
          const dataCount = res.data_count
          const sheetData = res.table_data
          const fields = res.fields
          const tableName = res.table_name
          const fields_display = res.fields_display
          const newData = [fields_display, ...sheetData]
          const sheet = XLSX.utils.json_to_sheet(newData, { header: fields, skipHeader: true })
          const wb = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(wb, sheet, tableName)
          XLSX.writeFile(wb, tableName + '.xlsx')
          this.$notify({
            title: this.$t('TablePage.MsgExportSuccess'),
            message: this.$t('TablePage.MsgExportData1') + dataCount + this.$t('TablePage.MsgExportData2'),
            type: 'success'
          })
          // 1秒后自动关闭窗口
          setTimeout(() => {
            this.handleExportClose() // 导出后自动关闭窗口
          }, 1000)
        }
      })
    },
    // 导入数据窗口关闭
    handleExportClose() {
      this.exportDialogVisible = false
    },
    // 帮助提示按钮
    helpTips() {
      this.helpDialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../assets/css/common/TablePage';
</style>
<style>
.btnDanger{
  background-color: #F56C6C !important;
  border-color: #F56C6C !important;
}
.btnDanger:hover{
  background-color: #f04747 !important;
  border-color: #f04747 !important;
}
.el-pagination {
    text-align: center;
}

.upload-demo {
  display: flex;
 }
.el-list-enter-active,
.el-list-leave-active {
  transition: none;
}
.el-list-enter,
.el-list-leave-active {
  opacity: 0;
}
.el-upload-list {
  height: 40px;
 }

.el-table .warning-row {
  color: #E6A23C;
}

</style>
